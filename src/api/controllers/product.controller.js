import productModels from "../models/product.models.js";

export const getProducts = async (req, res) => {
    try {
        const [rows] = await productModels.selectAllProducts();
        res.status(200).json({
            products: rows,
            message: rows.length ? `Productos Totales : ${rows.length}` : "No Hay Productos Cargados"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del sv al obtener productos"
        });
    };
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModels.selectProductWhereId(id);

        product ? res.status(200).json({
            product: product,
        }) : res.status(404).json({
            message: "ERROR! NOT FOUND"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del sv al obtener productos"
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, image, price, stock, category } = req.body;

        const product = await productModels.selectProductWhereNameAndCategory(name, category);
        if(product){
            return res.status(409).json({
                message: "Error! Producto ya existente!"
            })
        }

        const result = await productModels.insertProduct(name, image, price, stock, category);

        result ?
            res.status(201).json({
                message: "producto creado con exito",
                idProduct: result
            }) : res.status(400).json({
                message: "error! no se creo el producto"
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del sv al obtener productos"
        });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = productModels.deleteProduct(id);

        result ?
            res.status(200).json({
                result,
                message: `PRODUCTO CON ID : ${id} ELIMINADO CON EXITO`
            }) : res.status(404).json({
                message: "ERROR! NOT FOUND"
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del sv al obtener productos"
        });
    }
};

export const modifyProduct = async (req, res) =>{
    try {
        const {id, name, image, price, stock, category} = req.body;
        const result = await productModels.updateProduct(name, image, price, stock, category, id);
        
        result ? res.status(200).json({
                message: "Producto actualizado correctamente"
            }) : res.status(404).json({
                    message: "ERROR! NOT FOUND"
            });
    } catch (error) {
         console.error(error);
        res.status(500).json({
            message: "Error interno del sv al obtener productos"
        });
    }
};
