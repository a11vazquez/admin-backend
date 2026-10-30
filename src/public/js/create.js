import { apiUrl } from "./helper.js";
let altaProducts_container = document.getElementById("altaProducts-container");
const container = document.querySelector(".container");
const btn_container_close = document.querySelector(".btn-container-close");
const textAlert = document.getElementById("textAlert");

altaProducts_container.addEventListener("submit", async (event) => {
    event.preventDefault(); //prevenimos el envio de datos por defecto del FORM

    const product = Object.fromEntries(new FormData(event.target));
    console.log("Form Product : ", product)
        if(textAlert.textContent.length) textAlert.textContent = "";
    try {
        let response = await fetch(`${apiUrl}api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product) //parsea el objeto js a json para enviarlo por http
        });

        const result = await response.json();
        console.log("RESPONSE : ", response);
        console.log("RESULT RESPONSE PARSE JSON OBJ JS : ", result);
        if (response.ok) {
            product.id = result.idProduct;
            printProduct(product);
            container.classList.remove("hidden");
            btn_container_close.classList.remove("hidden");
            textAlert.textContent = "Producto Creado Con Exito";
            textAlert.classList.add("create-text")
            textAlert.classList.remove("error-message");
            console.log(`${result.message} - Id Product : ${result.idProduct}`);
        } else {
            console.log("RESULT MESSAGE : ", result.message);
            textAlert.classList.add("error-message");
            textAlert.textContent = `${result.message}`
            throw new Error("Erorr al insertar, no se a creado el producto");
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
            text.textContent = `${result.message}`
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
            <p>Stock : ${p.stock}</p>
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
    addOrRemoveHiddenClass();
});


function addOrRemoveHiddenClass(){
    if(container.classList.contains("hidden"))
        container.classList.remove("hidden");
    else
        container.classList.add("hidden");

    if(btn_container_close.classList.contains("hidden"))
        btn_container_close.classList.remove("hidden");
    else
        btn_container_close.classList.add("hidden");

}
