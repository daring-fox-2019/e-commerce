module.exports = (req, res, next) => {
  const { decoded } = req;

  if (decoded.role !== 'admin') {
    const err = {
      status: 401,
      message: 'unauthorized to access'
    }
    next(err);
  } else {
    next();
  }
}