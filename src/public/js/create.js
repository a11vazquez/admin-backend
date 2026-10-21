
/*Crear producto, enviando peticion a metodo POST a traves de los datos de un FORM */
console.log("CORRIENDO JS DE CREATE");
import { apiUrl } from "./helper.js";
let altaProducts_container = document.getElementById("altaProducts-container");
// const ul = document.querySelector(".ul-product");
const container = document.querySelector(".container");
const btn_container_close = document.querySelector(".btn-container-close");

altaProducts_container.addEventListener("submit", async (event) => {
    event.preventDefault(); //prevenimos el envio de datos por defecto del FORM

    //convertir los clave-valor del formData en objeto.
    let producto = Object.fromEntries(new FormData(event.target));
    //console.log(`Product ${JSON.stringify(producto)}`);
    console.log(producto)
    //let producto = Object.fromEntries(formData);

    try {
        let response = await fetch(`${apiUrl}api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto) //parsea el objeto js a json para enviarlo por http
        });

        const result = await response.json();
        if (response.ok) {
            console.log(response);
            producto.id = result.idProduct;
            printProduct(producto);
            btn_container_close.classList.remove("hidden");
            container.classList.remove("hidden");
            console.log(`${result.message} - Id Product : ${result.idProduct}`);
        } else {
           container.innerHTML =
                `<div class="error-message">
                    <p>ERROR! ${response.message}</p>
                </div>`
            //throw new Error("Erorr al insertar, no se a creado el producto");
        }

    } catch (err) {
        console.error(err);
        console.log(`Error en la conexion al enviar los datos del producto`, err);
    }
});


/*=================
    CREAR USUARIO
=================*/
const text = document.querySelector(".create-text");
const altaUseForm = document.getElementById("altaUser-form");
altaUseForm.addEventListener("submit", async event => {
    event.preventDefault();
    console.log("creando usuario submit form user");

    let formData = Object.fromEntries(new FormData(event.target));
    console.log("datos form : ", formData);
    try {
        const response = await fetch(`${apiUrl}api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log("STATUS:", response.status);
        console.log("RESULTADO DEL SERVIDOR:", result);

        if (response.ok) {
            text.textContent = `Usuario Creado Con Exito`
            console.log(`${result.message} - Id usuario: ${result.userID}`);
        } else {
            text.textContent = `Error al crear Usuario`
            text.classList.remove("create-text")
            text.classList.add("error-message")
            throw new Error(result.message || "Error al crear usuario");
        }

    } catch (error) {
        console.log(error.message);
    }
});

function printProduct(p) {
            container.insertAdjacentHTML("afterbegin",`
        <div class="card-product panel-card">
            <ion-icon class="btn-div-close"  name="close-outline"></ion-icon>
            <img src="${p.image}" alt="p.name"> 
            <p>ID : ${p.id}</p>
            <h3>Name : ${p.name}</h3> 
            <p>Category : ${p.category} </p>
            <p>Price : <strong>$${p.price}</strong></p>
            <p>Stock : 11</p>
        </div>` );
}


/*REMOVE LI */
container.addEventListener("click", (e) =>{
    if(e.target.matches('.btn-div-close')){
        e.target.closest('div').remove();
        if(!container.children.length){
            btn_container_close.classList.add("hidden");
        }
    }
});
btn_container_close.addEventListener("click", () =>{
    container.classList.add("hidden");
    btn_container_close.classList.add("hidden");
});



