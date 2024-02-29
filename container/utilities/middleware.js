function checkAcceptHeader(req, res, next) {
    const acceptHeader = req.get("Accept");
    if (acceptHeader?.indexOf("application/json") >= 0) {
        res.locals.asJson = true;
    }
    next();
}

module.exports = {
    checkAcceptHeader
}