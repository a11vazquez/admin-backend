
const container = document.querySelector(".container");
// const form = document.getElementById("searchForm");
// const inputSearchProd = document.getElementById("searchProd");
import { initSearchForm, apiUrl } from "./helper.js";

function printProduct(p) {
    container.innerHTML = `
            <ul class="ul-product">
                <li class="li-product">
                    <img src="${p.img}" alt="Imagen del producto">
                    <p>Id: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: <strong>$${p.price}</strong> </p>
                    </li>
                    <li>
                        <button class="card-btn btn-delete" data-id="${p.id}" data-btn-delete>Eliminar Producto</button>
                    </li>
            </ul>
            `;
}

const searchForm = initSearchForm({
    onSucces(product) { printProduct(product) },
    container
}
);


async function deleteProduct(id) {
    console.log("ID PRODUCTO ELIMINADO : ", id);
    try {
        const res = await fetch(`${apiUrl}${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        if (res.ok) {
            searchForm.reset();
            searchForm.printMessage(data.message, "green");
        } else{
            searchForm.printMessage(data.message, "red");
            return;
        }

        searchForm.reset();

    } catch (error) {
        console.log("ERROR AL ELIMINAR PRODUCTO", error);
        searchForm.printMessage(error.message, "red");
    }
}



container.addEventListener("click", async (event) => {
    event.stopPropagation();
    let btnDelete = event.target.closest("[data-btn-delete]");

    if (!btnDelete)
        return;

    let confirmacion = confirm("¿Queres Eliminar Este Producto?");
    console.log(confirmacion);
    if (!confirmacion) {
        return;
    } else {
        const id = btnDelete.dataset.id;
        console.log(id);
        await deleteProduct(id);
    }
});