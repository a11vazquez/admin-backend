   /*Obtener productos desde el FRONT lado del cliente */
           // import API_URL from "./src/api/config/api.js"
    import { apiUrl } from "./helper.js";

   const container = document.querySelector(".container");
   const form = document.getElementById("searchForm");

   const btnDelete = document.querySelector(".btn-delete");
   const btnModify = document.querySelector(".btn-modify");

        form.addEventListener("submit", async (e)=> {
            e.preventDefault(); // prevenir el envio por default

            //convierto pares clave-valor del FormData a objeto, de ahi destructuro la prpiedad id, sacada del name="id"
            const {id} = Object.fromEntries(new FormData(e.target));
            //const id = new FormData(event.target).get("id");
    
             try {
            
                 let res = await fetch(`${apiUrl}api/products/${id}`);
                 let data = await res.json();
                 let product = data.product;
                if(res.ok){ 
               // let products = data.payload;
               container.innerHTML= "";
                container.appendChild(createProductCard(product));
                console.log("View Products");
                console.table(product);
            }else{
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
    // async function obtenerProductos()
    // {
    //     try {
            
    //         let res = await fetch(`http://localhost:3000/products/${id}`);
    //         let data = await res.json();
            
    //         let product = data.payload;
    //         console.table(product);
    //         container.appendChild(createProductCard(product));
    //     } catch (error) {
    //             console.error('error obteniendo productos : ', error);
    //     }
    //     }

    //     function renderProducts(array){
    //         array.forEach(p => { 
    //             container.appendChild(createProductCard(p));
    //         });
    //     }
        
    function createProductCard(p){
             const card = document.createElement("article");
                card.classList.add("product-info");
                
                 card.innerHTML = `
                 <div class="card-product">
                              <img src="https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png" alt="">
                              <div class="product-details">  
                                  <h3 data-product-title>IPHONE PRO MAX 18</h3> 
                                  <p data-product-id>Id: 1</p>
                                  <p data-product-category>Category: Iphone</p>
                                  <p data-product-price>Price: 1500</p>
                                  <p data-product-stock>Stock: 11</p>
                              </div>
                          </div>
                              <div class="card-buttons">
                                  <button class="card-btn btn-delete">Delete</button>
                                  <button class="card-btn btn-modify">Modify</button>
                              </div>

            `;
           
           const img = card.querySelector("img");
            // console.log(p);
            // console.log(p.img);

           img.src = p.img;
           img.alt = p.name;

           const title = card.querySelector("[data-product-title]");
            title.textContent = p.name;

            const category = card.querySelector("[data-product-category]");
            category.textContent = p.category;

            const price = card.querySelector("[data-product-price]");
            price.textContent = `Price: $${p.price}`;

            const stock = card.querySelector("[data-product-stock]");
            stock.textContent = `Stock : ${p.stock}`;

            return card;
    }

    container.addEventListener("click", e =>{
        if(e.target.matches('btn-delete')){
            
        }else if(e.target.matches('btn-modify')){

        }

    });

