module.exports = (err, req, res, next) => {
  let { status, message, origin } = err
  console.log({err, dari: origin})
  if (status !== undefined) {
    res.status(status).json({ message })
  } else {
    // if(err.name === "ValidationError")
    // res.status(400).json()
    // else 
    // res.status(500).json({ message: 'internal server error' })
    err = err.toString()
    res.status(500).json({ message: err })
  }
}
