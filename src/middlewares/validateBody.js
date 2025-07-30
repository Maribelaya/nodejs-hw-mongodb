import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false, // щоб показувати всі помилки, а не тільки першу
    });
    next();
  } catch (err) {
    if (err.isJoi && err.details) {
      const details = err.details.map((detail) => ({
        field: detail.context?.label || detail.path.join('.'),
        message: detail.message,
      }));

      const error = createHttpError(400, 'Bad Request', {
        errors: details, // масив деталей
      });

      next(error);
    }
    next(createHttpError(500, 'Internal Server Error'));
  }
};
