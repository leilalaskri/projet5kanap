let cart__items = document.getElementById("cart__items");
let article = document.createElement("article");
cart__items.appendChild(article);
article.classList.add("cart__item");
let cart = document.getElementsByClassName("cart__item")[0];
let div = document.createElement("div");
cart.appendChild(div);
div.classList.add("cart__item__img");
let divim = document.getElementsByClassName("cart__item__img")[0]; //recuperer le premier elt
let img = document.createElement("img");

divim.appendChild(img);
let divcart = document.getElementsByClassName("cart__item")[0];
div = document.createElement("div");
divcart.appendChild(div);
div.classList.add("cart__item__content");
let divcar = document.getElementsByClassName("cart__item__content")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__description");
let newh = document.createElement("h2");
newh.textContent = "Nom du produit";
div.appendChild(newh);
let newp = document.createElement("p");
newp.textContent = "Vert";
div.appendChild(newp);
newp = document.createElement("p");
newp.textContent = "42,00 €";
div.appendChild(newp);
divcar = document.getElementsByClassName("cart__item__content")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__settings");
divcar = document.getElementsByClassName("cart__item__content__settings")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__settings__quantity");
newp = document.createElement("p");
newp.textContent = "Qté :";
div.appendChild(newp);
divcar = document.getElementsByClassName("cart__item__content__settings")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__settings__delete");
newp = document.createElement("p");
newp.textContent = "Supprimer";
div.appendChild(newp);
newp.classList.add("deleteItem");

console.log(localStorage.getItem("panier"));
objLinea = localStorage.getItem("panier");
produit = JSON.parse(objLinea);
console.log(produit.id);
let id = produit.id;
let carFetch = function() {

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            img.alt = data.altTxt;
            img.src = data.imageUrl;


        });
};
carFetch();