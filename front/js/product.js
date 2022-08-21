const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log(id);

let cardFetch = function() {

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {

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

            function quantiteValue() {
                let qte = document.getElementById("quantity");
                return qte.value;
            }

            function colorValue() {
                let color = document.getElementById("colors");
                return colors.value;
            }

            const boutton = document.getElementById("addToCart");
            let qty = quantiteValue();
            let color = colorValue();


            boutton.addEventListener("click", () => {
                let qty = quantiteValue();
                let color = colorValue();
                addCart(id, color, qty);

            });

        });
};
cardFetch();

function comparaison() {
    let tab = [];
    if (localStorage.getItem("panier") != null) {
        tab = JSON.parse(localStorage.getItem("panier"));
    }
    return tab;

}

function addCart(id, color, qty) {


    if (qty <= 0 || color == "") {
        return;
    }
    let tab = comparaison();
    if (tab.length == 0) {
        tab = [
            [id, color, qty]
        ];

    } else {
        let bool = false;
        for (let i = 0; i < tab.length; i++) {
            if (id === tab[i][0] && color === tab[i][1]) {
                bool = true;
                tab[i][2] += qty;

            }
        }
        if (bool == false) {
            let tabl = [id, color, qty];
            tab.push(tabl);
        }
    }
    localStorage.setItem("panier", JSON.stringify(tab));
}