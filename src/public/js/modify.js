const container = document.querySelector(".container");
import { initSearchForm, apiUrl, searchProductBDD } from "./helper.js";
let product;

const searchForm = initSearchForm({
    onSucces(product){
        printProduct(product);
    },
    container
});
// async function searchProductBDD(id) {

//     const res = await fetch(`${apiUrl}${id}`);
//     console.log("RESPONSE : ", res);
//     const data = await res.json();

//     console.log("DATA : ", data);
//     console.log("DATA PRODUCT: ", data.product);

//     if (res.ok) {
//         return data.product;
//     } else {
//         console.log("MESSAGE ERROR ID : ", data.message);
//         printHtmlMessage(data.message,"red");
//         return null;
//     }
// }
// form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const { id } = Object.fromEntries(new FormData(e.target));

//     try {
//         data = await searchProductBDD(id);
//         if(data)
//          printProduct(data);

//     } catch (error) {
//         console.error('error obteniendo productos : ', error);
//     }
// });

async function actualizarProducto(event) {
    event.preventDefault();
    event.stopPropagation();
    const p = Object.fromEntries(new FormData(event.target));

    console.log("Form datos put method");
    try {
        const res = await fetch(`${apiUrl}api/products`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(p)
        });

        const result = await res.json();
        if(res.ok){
            searchForm.printMessage(result.message, "green");
        }else 
            searchForm.printMessage(result.message, "red");
            
        console.log("RESULT MESSAGE : ", result.message);
        searchForm.reset()
    } catch (error) {
        console.log("ERROR AL Modificar PRODUCTO", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("altaProducts-container");

    if (updateForm) {
        updateForm.addEventListener("submit", actualizarProducto);//preguntar;: como se le pasa el evento por parametroa actualizarProducto
    }
});
function printProduct(p) {
    container.innerHTML = `
            <ul class="ul-product">
                <li class="li-product">
                    <img src="${p.img}" alt="Imagen del producto">
                    <p>Id: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: <strong>$${p.price}</strong> </p>
                    </li>
                    <li>
                        <button class="input-btn" data-id="${p.id}" data-btn-modify>Modificar Producto</button>
                    </li>
            </ul>
            `;
}



async function crearFormulario(p) {
    container.innerHTML = `
                <form id="altaProducts-container" class="classic-form">
               
                <input type="hidden" name="id" class="input" value="${p.id}">
                <label for="nameProd">Name</label>
                <input type="text" name="name" id="nameProd" class="input" value="${p.name}" required>

                <label for="imageProd">Image</label>
                <input type="text" name="image" id="imageProd" class="input" value="${p.img}" required>

                <label for="priceProd">Price</label>
                <input type="number" name="price" id="priceProd" class="input" value="${p.price}" required>

                <label for="imageProd">Select Category :</label>
                <select name="category" id="categoryProd">
                    <option value="auriculares">Auriculares</option>
                    <option value="iphod's">Iphod</option>
                </select>

                <input type="submit" class="input-btn" value="Actualizar Producto">
            </form>
                `;

    const updateForm = document.getElementById("altaProducts-container");
    updateForm.addEventListener("submit", e => {
        actualizarProducto(e);
    });
}

container.addEventListener("click", async (event) => {
    let btnModify = event.target.closest("[data-btn-modify]");
    console.log("BTN MODIFY : ", btnModify);
    if (!btnModify) 
        return;

    if (!product) {
        const id = btnModify.dataset.id;
         console.log("ID CONTAINER : ", id);
         product = await searchProductBDD(id);
         console.log("PRODUCT : ", product);
    }

    crearFormulario(product);
});


