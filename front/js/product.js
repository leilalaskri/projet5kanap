const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log(id);

let cardFetch = function() {

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let divimg = document.getElementsByClassName("item__img")[0]; //recuperer le premier elt
            let img = document.createElement("img");
            img.alt = data.altTxt;
            img.src = data.imageUrl;
            divimg.appendChild(img);
            let name = document.getElementById("title");
            name.innerHTML = data.name;
            let price = document.getElementById("price");
            price.innerHTML = data.price;
            let description = document.getElementById("description");
            description.innerHTML = data.description;
            let colors = document.getElementById("colors");


            for (i = 0; i < data.colors.length; i++) {
                colors.innerHTML +=
                    `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
            }
            let lien = function() {
                window.location = "./cart.html";

            };


            const boutton = document.getElementById("addToCart");
            boutton.addEventListener('click', addpanier);

        });
};
cardFetch();
let addpanier = function() {
    qte = quantiteValue();
    color = colorValue();
    let produit = {
        id: id,
        quantite: qte,
        couleur: color,
    };
    let tab = [produit];
    console.log(tab);
    let objLinea = JSON.stringify(produit);
    localStorage.setItem("panier", objLinea);
    console.log(localStorage.getItem("panier"));
    objLinea = localStorage.getItem("panier");
    produit = JSON.parse(objLinea);



}

function quantiteValue() {
    let qte = document.getElementById("quantity");
    return qte.value;
}

function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}