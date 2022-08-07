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

            function quantiteValue() {
                let qte = document.getElementById("quantity");
                return qte.value;
            }


            function colorValue() {
                let color = document.getElementById("colors");
                return color.value;
            }
            let addpanier = function(id, qte, color) {
                console.log(id);
                qte = quantiteValue();
                console.log(qte);
                color = colorValue();
                console.log(color);
                let tab = [id, qte, color];
                console.log(tab);
                let objLinea = JSON.stringify(tab);
                localStorage.setItem("panier", objLinea);
                console.log(localStorage.getItem("panier"));
            }
            const boutton = document.getElementById("addToCart");
            boutton.addEventListener('click', addpanier);
            const bouton = document.getElementById("addToCart");
            boutton.addEventListener('click', lien);
        });
};
cardFetch();