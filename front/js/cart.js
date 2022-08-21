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
div.appendChild(newh);
let newc = document.createElement("p");
div.appendChild(newc);
let newp = document.createElement("p");
div.appendChild(newp);
divcar = document.getElementsByClassName("cart__item__content")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__settings");
divcar = document.getElementsByClassName("cart__item__content__settings")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__settings__quantity");
newq = document.createElement("p");
div.appendChild(newq);
divcar = document.getElementsByClassName("cart__item__content__settings")[0];
div = document.createElement("div");
divcar.appendChild(div);
div.classList.add("cart__item__content__settings__delete");
news = document.createElement("p");
news.textContent = "Supprimer";
div.appendChild(news);
newp.classList.add("deleteItem");
console.log(localStorage.getItem("panier"));
objLinea = localStorage.getItem("panier");
produit = JSON.parse(objLinea);

function comparaison() {
    let tab = [];
    if (localStorage.getItem("panier") != null) {
        tab = JSON.parse(localStorage.getItem("panier"));
    }
    return tab;

}

function affichage() {
    let tab = comparaison();
    if (localStorage.getItem("panier") != null) {
        for (let i = 0; i < tab.length; i++) {
            let id = tab[i][0];
            let color = tab[i][1];
            let carFetch = function() {
                fetch(`http://localhost:3000/api/products/${id}`)
                    .then((response) => response.json())
                    .then((data) => {

                        img.alt = data.altTxt;
                        img.src = data.imageUrl;
                        newh.textContent = data.name;
                        newc.textContent = color;
                        newp.textContent = data.price + "€";
                        qty = tab[i][2];
                        newq.textContent = qty;



                    });
            };
            carFetch();
        }


    };
};
affichage();

function deletelement(id, color) {
    let tab = comparaison();
    for (i = 0; i < tab.length; i++) {
        if (id === tab[i][0] && color === tab[i][1]) {
            tab.splice(i, 1);
            localStorage.setItem("panier", JSON.stringify(tab));

        }
    }
}

function changeQuantity(id, color, qty) {
    let tab = comparaison();
    for (let i = 0; i < tab.length; i++) {
        if (id === tab[i][0] && color === tab[i][1]) {
            tab[i][2] = qty;
        }
        localStorage.setItem("panier", JSON.stringify(tab));

    }
}
//bouttonchangement.addEventListener("click", () => {
// let qty = quantiteValue();
// let color = colorValue();
// changeQuantity(id, color, qty);

//})