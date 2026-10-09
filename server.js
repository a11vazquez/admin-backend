/*===================
        IMPORTS
=====================*/
import express from "express"; //importamos el framework express.js, , antes npm i express

const app = express();


app.listen(PORT,() =>{
    console.log(`Server running in port: ${PORT}`);
});