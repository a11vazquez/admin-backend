/*Obtener productos desde el FRONT lado del cliente */
// import API_URL from "./src/api/config/api.js"
import { apiUrl } from "./helper.js";

const container = document.querySelector(".container");
const form = document.getElementById("searchForm");

const btnDelete = document.querySelector(".btn-delete");
const btnModify = document.querySelector(".btn-modify");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevenir el envio por default

    //convierto pares clave-valor del FormData a objeto, de ahi destructuro la prpiedad id, sacada del name="id"
    const { id } = Object.fromEntries(new FormData(e.target));
    //const id = new FormData(event.target).get("id");

    try {

        let res = await fetch(`${apiUrl}api/products/${id}`);
        let data = await res.json();
        let product = data.product;
        if (res.ok) {
            // let products = data.payload;
            container.innerHTML = "";
            container.appendChild(createProductCard(product));
            console.log("View Products");
            console.table(product);
        } else {
            console.log(data.message);
            alert(data.message);
            container.innerHTML = `
                <div class="error-message">
                    <p>ERROR! ${data.message}</p>
                </div>
            `;
        }
        // let product = data.product;
    } catch (error) {
        console.error('error obteniendo productos : ', error);
    }
});

function createProductCard(p) {
    const card = document.createElement("article");
    card.classList.add("product-info");

    card.innerHTML = `
                 <div class="card-product">
                              <img src="${p.img}" alt="${p.name}">
                              <div class="product-details">  
                                  <h3>${p.name}</h3> 
                                  <p>Id: ${p.id}</p>
                                  <p>Category: ${p.category}</p>
                                  <p>Price: ${p.price}</p>
                                  <p>Stock: ${p.stock}</p>
                              </div>
                          </div>
                              <div class="card-buttons">
                                  <button class="card-btn btn-delete" data-btn-delete data-id="${p.id}">Delete</button>
                                  <button class="card-btn btn-modify" data-btn-modify data-id="${p.id}">Modify</button>
                              </div>
            `;
    return card;
}

container.addEventListener("click", e => {
    const btnDelete = e.target.closest("[data-btn-delete]");
    const btnModify = e.target.closest("[data-btn-modify]");

    if (btnDelete) {
        const id = btnDelete.dataset.id;
        window.location.replace(`/delete/${id}`);
        return;
    } else if (btnModify) {
        const id = btnModify.dataset.id;
        window.location.replace(`/modify/${id}`);
        return;
    }
});

