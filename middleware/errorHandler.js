const errorHandler = (err, req, res, next) => {
    console.log(err,'<<< error');
    let message = "Internal server error"
    let status = 500

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            message = err.errors[0].message
            status = 400
            break;
        case "Unauthorized":
        case "JsonWebTokenError":
            message = err.message
            status = 401
        case "Badrequest":
            message = err.message
            status = 400
        case "Notfound":
            message = err.message
            status = 404
        default:
            break;
    }


    res.status(status).json({ message })
}

module.exports = errorHandler