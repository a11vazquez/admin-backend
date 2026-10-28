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

const validateProductFields = (req, res, next) => {
    const { name, image, price, stock, category } = req.body;
    //validacion campos requeridos.
    if (!name || !image || !price || !stock || !category) {
        return res.status(400).json({
            message: "campos no requeridos, no pueden ser null"
        });
    }
    next();
}

const validateSaleFields = (req, res, next) =>{
    let {totalPrice, name, email, phone, idProducts} = req.body;
     if(!totalPrice || !name || !email || !phone || 
                    !Array.isArray(idProducts)){
                    return res.status(400).json({
                        message: "Datos incompletos"
                    });
                };
                next();
}

export {
    sessionValidate,
    validateId,
    validateProductFields,
    validateSaleFields
};