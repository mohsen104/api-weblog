function AllExceptionHandler(app) {
  app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
    const message = err?.message ?? err?.stack ?? 'InternalServer Error';
    if (process.env.NODE_ENV === 'development') {
      res.status(status).json({
        errno: err.errno,
        code: err.code,
        message,
      });
    } else {
      res.status(status).json({
        message: err.message || 'an error occurred',
      });
    }
  });
}

export default AllExceptionHandler;
