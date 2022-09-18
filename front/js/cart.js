function createImage(src, alt) {
    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    return img

}

function createTitle(balise, text) {
    const title = document.createElement(balise)
    title.textContent = text
    return title
}

function createDivContainer(className) {
    const container = document.createElement('div')
    container.classList.add(className)
    return container
}

function createinput(quantite) {
    const input = document.createElement('input')
    input.type = "number"
    input.class = "itemQuantity"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = quantite
    return input
}

objLinea = localStorage.getItem("panier");
produit = JSON.parse(objLinea);
//remplir le tableau par la liste de produits dans le panier
function FillingTab() {
    let tab = [];
    if (localStorage.getItem("panier") != null) {
        tab = JSON.parse(localStorage.getItem("panier"));
    }
    return tab;

}


function createArticle(src, alt, id, color, title, price, quantite) {
    const article = document.createElement("article");
    article.dataset.id = id
    article.dataset.color = color
    article.classList.add("cart__item");

    const imgDiv = createDivContainer('cart__item__img')
    article.appendChild(imgDiv);

    const img = createImage(src, alt);
    imgDiv.appendChild(img);

    const contentDiv = createDivContainer('cart__item__content')
    article.appendChild(contentDiv);
    const descriptionDiv = createDivContainer('cart__item__content__description')
    contentDiv.appendChild(descriptionDiv);
    const nom = createTitle('h2', title)
    descriptionDiv.appendChild(nom);
    const couleur = createTitle('p', color)
    descriptionDiv.appendChild(couleur);
    const prix = createTitle('p', price + "€")
    descriptionDiv.appendChild(prix);
    const settingsDiv = createDivContainer('cart__item__content__settings')
    contentDiv.appendChild(settingsDiv);
    const settingDiv = createDivContainer('cart__item__content__settings__quantity')
    settingsDiv.appendChild(settingDiv);
    const quantites = createTitle('p', ("Qté :"), quantite)
    settingDiv.appendChild(quantites);
    const inputDiv = createinput(quantite)
    settingDiv.appendChild(inputDiv);
    inputDiv.addEventListener("change", () => {

        changeQuantity(id, color, inputDiv.value);

    })
    const deleteDiv = createDivContainer('cart__item__content__settings__delete')

    article.appendChild(deleteDiv);
    const delet = createTitle('p', "supprimer")
    deleteDiv.appendChild(delet);
    delet.classList.add("deleteItem");
    delet.addEventListener('click', () => {
        deletelement(id, color)
    })

    return article;
}

function affichage() {
    let tab = FillingTab();
    let cart__items = document.getElementById("cart__items");

    if (localStorage.getItem("panier") != null) {
        for (let i = 0; i < tab.length; i++) {
            let id = tab[i].id;
            let qty = tab[i].qty;
            let color = tab[i].color;

            let carFetch = function() {
                fetch(`http://localhost:3000/api/products/${id}`)
                    .then((response) => response.json())
                    .then((data) => {

                        let article = createArticle(data.imageUrl, data.altTxt, id, color, data.name, data.price, qty)
                        cart__items.appendChild(article);




                    });
            };
            carFetch();
        }


    };
};

affichage();

function deletelement(id, color) {
    let tab = FillingTab();
    for (i = 0; i < tab.length; i++) {
        if (id === tab[i].id && color === tab[i].color) {
            tab.splice(i, 1);
            localStorage.setItem("panier", JSON.stringify(tab));
            location.reload();
        }
    }
}

function changeQuantity(id, color, qty) {
    let tab = FillingTab();
    for (let i = 0; i < tab.length; i++) {
        if (id === tab[i].id && color === tab[i].color) {
            tab[i].qty = qty;
        }
        localStorage.setItem("panier", JSON.stringify(tab));

    }
}


const emailErrorMsg = document.getElementById("emailErrorMsg");

function validateEmail(mail) {
    const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexMail.test(mail) == false) {
        return false;
    } else {
        emailErrorMsg.innerHTML = null;
        return true;
    }
}


const regexName = /^[a-zA-Z ]+$/;
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

function validateFirstName(prenom) {

    if (regexName.test(prenom) == false) {
        return false;
    } else {
        firstNameErrorMsg.innerHTML = null;
        return true;
    }
}
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

function validateLastName(nom) {
    if (regexName.test(nom) == false) {
        return false;
    } else {
        lastNameErrorMsg.innerHTML = null;
        return true;
    }
}
const cityErrorMsg = document.getElementById("cityErrorMsg");

function validateCity(ville) {
    if (!regexName.test(ville)) {
        return false;
    } else {
        cityErrorMsg.innerHTML = null;
        return true;
    }
}
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");



function message() {
    let email = validateEmail(mail.value);
    let firstName = validateFirstName(prenom.value);
    let lastName = validateLastName(nom.value);
    let city = validateCity(ville.value);
    if (
        email == false ||
        firstName == false ||
        lastName == false ||
        city == false
    ) {
        if (email == false) {
            emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
        }
        if (firstName == false) {
            firstNameErrorMsg.innerHTML = "Entrez un prénom valide ";
        }
        if (lastName == false) {
            lastNameErrorMsg.innerHTML = "Entrez un nom valide ";
        }
        if (city == false) {
            cityErrorMsg.innerHTML = "Entrez une commune valide ";
        }

        return
    }
}
let BouttonCommander = document.getElementById("order")
BouttonCommander.addEventListener("click", (e) => {
    e.preventDefault();

    message();


    let jsonData = contactProduct();
    fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData

        })
        .then((response) => response.json())
        .then((data) => {

            localStorage.setItem("orderId", data.orderId);
            window.location = "./Confirmation.html";




        });
})

function contactProduct() {
    let contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: mail.value,
    };
    let tab = FillingTab();
    let products = [];

    for (i = 0; i < tab.length; i++) {
        products.push(tab[i].id);
    }
    let jsonData = JSON.stringify({ contact, products });
    return jsonData;
}