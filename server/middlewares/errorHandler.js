module.exports = (err, req, res, next) => {
    let arr = [];

    // console.log(err.message)
    res
        .status(500)
        .json({
            message: err.message
        });
};
