//Lógica do filtro
const boxFiltro=document.getElementById("boxFiltro")
const pesquisaBox=document.getElementById("pesquisaBox")
const btnFiltro=document.getElementById("btnFiltro")

btnFiltro.addEventListener('click', () => {
    if (boxFiltro.style.display === "none") {
        pesquisaBox.style.display = "none";
        boxFiltro.style.display = "flex";
        btnFiltro.textContent="Voltar"
    } else {
        pesquisaBox.style.display = "flex";
        boxFiltro.style.display = "none";
        btnFiltro.textContent="Filtro"
    }
});