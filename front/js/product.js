let cardFetch = function() {
    const str = window.location;
    const url = new URL(str);
    const id = url.searchParams.get("id");

    fetch("http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let img = document.getElementsByClassName("item__img");
            img.innerHTML = data.imageUrl;
            let name = document.getElementById("title");
            name.innerHTML = data.name;
            let price = document.getElementById("price");
            price.innerHTML = data.price;
            let description = document.getElementById("description");
            description.innerHTML = data.description;
        });
};
cardFetch();