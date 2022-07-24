let cardFetch = function() {
    const str = window.location;
    const url = new URL(str);
    const id = url.searchParams.get("id");

    fetch("http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let img = document.getElementsByClassName("item__img");
            img.innerHTML = src = data.imageUrl;
            alt = data.altTxt;
            let name = document.getElementById("title");
            name.innerHTML = data.name;
            let price = document.getElementById("price");
            price.innerHTML = data.price;
            let description = document.getElementById("description");
            description.innerHTML = data.description;
            let color = document.getElementById("colors");


            let lien = function() {
                boutton.innerHTML = "./cart.html";

            };
            const boutton = document.getElementById("addToCart");
            boutton.addEventListener('click', lien);
        });
};
cardFetch();