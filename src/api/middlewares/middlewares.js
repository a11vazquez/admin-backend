const sessionValidate = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("login");
    }
    next();
}

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            error: "Error! Validation!"
        });
    }
    next();
}

const validateCamps = (req, response, next) => {
    const { id, name, image, price, stock, category } = req.body;
    //validacion campos requeridos.
    if (!id || !name || !image || !price || !stock || !category) {
        return res.status(400).json({
            message: "campos no requeridos, no pueden ser null"
        });
    }
    next();
}

export {
    sessionValidate,
    validateId,
    validateCamps
};