

export const apiUrl = 'http://localhost:3000/'

function printHtmlMessage(container, message, color) {
    console.log(message);
    container.innerHTML = `<h1 style="display: flex; font-family: monospace; text-align: center; font-size: 5rem; color: ${color};"> ${message}</h1>`;
}

function resetInputValue(input) {
    input.value = '';
    input.focus();
}
export function initSearchForm({onSucces, container}){
    // const container = document.querySelector(".container");
    const form = document.getElementById("searchForm");
   const input = document.getElementById("searchProd");

    if(!input || !form) 
        return;

    form.addEventListener("submit", async e =>{
        e.preventDefault();

        const id = input.value.trim();
        console.log("ID DEL INPUT VALUE : ", id);
        if(!id){
            resetInputValue(input);
            printHtmlMessage(container,"Error ID no encotrada", "red");
            return;
        }

        try {
            const data = await searchProductBDD(id);

        if(data)
         onSucces(data);
        else{
            console.log("MESSAGE ERROR ID : ", data.message);
            printHtmlMessage(container, data,"red");
        }

        // resetInputValue(input);
        } catch (error) {
            console.log("ERROR AL OBTENER PRODUCTO");
            printHtmlMessage(container, error.message,"red");
        } 
    });

     return {
        reset() {
            resetInputValue(input);
        },
        printMessage(message, color){
            printHtmlMessage(container, message, color)
        }
    };
}


export async function searchProductBDD(id) {
    console.log("ID SEARCHPRODUCTBDD : ", id);
    const res = await fetch(`${apiUrl}api/products/${id}`);
    console.log("RESPONSE : ", res);
    const data = await res.json();

    console.log("DATA : ", data);
    console.log("DATA PRODUCT: ", data.product);

    return (res.ok) ? data.product : data.message;
}
