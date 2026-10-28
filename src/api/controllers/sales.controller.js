import pool from "../database/db.js";
import salesModels from "../models/sales.models.js";

export const insertSale = async (req, res) => {
    const connection = await pool.getConnection();
        try {
            //obtengo la conexion 
            await connection.beginTransaction();

            let {totalPrice, name, email, phone, idProducts} = req.body;
            const [saleResult] = await salesModels.insertSale(connection, totalPrice, name, email, phone);
            const saleId = saleResult.insertId;

            const [result] = await salesModels.insertProductSale(connection, idProducts, saleId);

           if(result.affectedRows){
                await connection.commit();
                return res.status(201).json({
                    message: 'venta registrada con exito'
                })
           }else throw new Error('error al registrar la venta');

        } catch (error) {
            await connection.rollback();
            console.log("ERROR REGISTRANDO VENTA", error.message);
            res.status(500).json({
                message : `${error.message}`,
                clientMessage: 'Error! no se pudo registrar la venta'
            });
        }finally{
            connection.release();
        }
}