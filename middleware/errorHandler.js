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
            message = err.message
            status = 401
            break;
        case "JsonWebTokenError":
            message = err.message
            status = 401
            break;
        case "Badrequest":
            message = err.message
            status = 400
            break;
        case "Notfound":
            message = err.message
            status = 404
            break;
        case "NotAcceptable":
            message = err.message
            status = 406
            break;
        default:
            break;
    }


    res.status(status).json({ message })
}

module.exports = errorHandler