const container = document.querySelector(".container");

container.addEventListener("click", e =>{
    const btnDelete = e.target.closest("[data-btn-delete]");
    const btnModify = e.target.closest("[data-btn-modify]");

    if (btnDelete) {
        const id = btnDelete.dataset.id;
        window.location.replace(`/delete/${id}`);
        return;
    }else if(btnModify){
         const id = btnModify.dataset.id;
        window.location.replace(`/modify/${id}`);
        return;
    }
});
