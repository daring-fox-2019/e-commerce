module.exports = (err, req, res, next) => {
  let { status, message, origin } = err
  console.log({err, dari: origin})
  if (status !== undefined) {
    res.status(status).json({ message })
  } else {
    err = err.toString()
    res.status(500).json({ message: err })
  }
}
