
const dataElement = document.getElementById("products-data");

const products = JSON.parse(dataElement.textContent);

console.log(products);
const container = document.querySelector(".container");

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

const searchProductInput = document.getElementById("filter-input");
searchProductInput.addEventListener("keyup", filterProductInput); // Evento al terminar de presionar una tecla.

function filterProductInput() {
    if (searchProductInput.value.length) {
        let filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchProductInput.value));
        filteredProducts.length ? printProducts(filteredProducts) : container.innerHTML = `<p>PRODUCT NOT FOUND</p>`;
    } else
        printProducts(products);
}


  //selecciono todas las categorias nodeList de divs con la clase .category-products_card
        const categories = document.querySelectorAll(".category-products_card");

        /*BTNS ORDENAR PRODUCTOS */
    const sortByPrice = document.getElementById("sort-price-btn");
    const sortByNormal = document.getElementById("sort-normal-btn");
    const sortByLowerPrice= document.getElementById("sort-price-lower-btn");

    sortByPrice.addEventListener("click", () => {
        sortProducts(2)
    });

    sortByNormal.addEventListener("click", () => {
       sortProducts(1)
    });

    sortByLowerPrice.addEventListener("click", () =>{
        sortProducts(3)
    });


function sortProducts(option){
    switch (option) {
        case 1:
             products.sort((pr1, pr2) => pr1.id - pr2.id); 
             
            break;
        case 2:
            products.sort((pr1, pr2) => pr2.price - pr1.price); 
            break;
        case 3:
            products.sort((pr1, pr2) => pr1.price - pr2.price); 
            break;
    }
printProducts(products);
}
 /*====================
        FILTER CATEGORY PRODUCTS
        =======================*/

//recorro las categorias agregando el evento click
        function configureCategories(){
            console.log("category:");
            categories.forEach(category => {
                category.addEventListener("click", () => { 
                    if (category.classList.contains("underline")){
                            console.log("desde el if contains:", category.dataset.category)
                            return; //si ya esta seleccionada, termina el evento
                        }

                    addUnderline(category);
                });
            });
        }

            function addUnderline(category){
               categories.forEach(c => c.classList.remove("underline")); //remove underline all categories
                category.classList.add("underline"); //add underline select categorie
            };
        




function printProducts(array) {
    cards = "";
    array.forEach(p => {
        cards += `
        <div class="card-product">
        <div class="card-product_img">
            <img src="${p.img}" alt="${p.name}"> 
        </div>
            <p>ID : ${p.id}</p>
                    <h3>${p.name}</h3> 
                    <p>Category: ${p.category}</p>
                    <p>Price: $${p.price}</p>
                    <p>Stock: ${p.stock}</p>
                    <div class="card-buttons">
                        <button class="card-btn btn-modify" data-id="${p.id}" data-btn-modify>Modificar</button>
                        <button class="card-btn btn-delete" data-id="${p.id}" data-btn-delete>Eliminar</button>
                    </div>
                </div>
        `
    });
    container.innerHTML = cards;
}

configureCategories();