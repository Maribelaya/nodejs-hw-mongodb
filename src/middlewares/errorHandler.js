// export function errorHandler(err, req, res, next) {
//   console.error('❌ ErrorHandler:', err.message);

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: err.message,
//   });
// }

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    status,
    message: err.message || 'Something went wrong',
  });
}
