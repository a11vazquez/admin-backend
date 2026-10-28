import salesModels from "../models/sales.models.js";

export const insertSale = async (req, res) => {
        try {
            let {totalPrice, name, email, phone} = req.body;

            if(!totalPrice || !name || !email || !phone || 
                !Array.isArray(arrayProductsIds)){
                return res.status(400).json({
                    message: "Datos incompletos"
                });
            };

            const [saleResult] = await salesModels.insertSale(totalPrice, name, email, phone);

            saleResult.affectedRows ? res.status(201).json({
                message: 'venta registrada con exito'
            }) : res.status(400).json({
                message: 'error al registrar la venta'
            })

        } catch (error) {
            console.log("ERROR REGISTRANDO VENTA", error);
            res.status(201).json({
                message : 'ERROR CAPTER! venta no registrada'
            });
        }
}