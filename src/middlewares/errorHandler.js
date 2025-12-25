export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  const response = {
    status,
    message: err.message || err.name || 'Error',
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  if (status === 409 || status === 400) {
    response.data = { message: response.message };
    delete response.message;
  }

  res.status(status).json(response);
}
