import userModels from "../models/user.models.js";
import { hashPassword } from "../utils/bycript.js";

export const insertUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return  res.status(400).json({
                message: "Datos incompletos, NOT FOUND",
            });
        }

        const hashedPassword = await hashPassword(password);

        const [rows] = await userModels.insertUser(name, email, hashedPassword);
        if(rows){
            res.status(201).json({
                message: "usuario creado con exito",
                userID: rows.insertId
            })
        }else{
            res.status(404).json({
                message: "ERROR AL CREAR USUARIO"
            });
        }
    } catch (error) {
        console.log("ERROR INTERNO DEL SV", error)
        res.status(500).json({
            message: "error interno del sv",
            error: error.message
        });
    }
}