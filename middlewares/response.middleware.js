const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.data) {
    res.status(200).json(res.data);
  } else if (res.error) {
    const statusCode = res.error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({
      error: true,
      message: res.error.message || 'An error occurred',
    });
  } else {
    next();
  }
};

export { responseMiddleware };
