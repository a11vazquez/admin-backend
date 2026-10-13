import productModels from "../models/product.models.js";

export const viewProducts = async (req, res) =>{
    try {
        const [rows] = await productModels.selectAllProducts();
        res.render("index",{
            title: "Panel",
            about: "Lista De Productos",
            products: rows
        });
    } catch (error) {
        console.log("Error en viewProducts.Controller", error);
    }
}