import "../css/styles.css";

import { products } from "./data";
import template from "../template.hbs";

// ТОВАРИ (ОСТАННЄ ЗАВДАННЯ)

// доступ
const productsContainer = document.querySelector("#products");

// рендер елементів
function renderProducts(items) {
    productsContainer.innerHTML = template(items);
}

renderProducts(products);

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(value);
    });

    renderProducts(filteredProducts);
});

// ЗАКЛАДКИ

const bookmarkInput = document.querySelector("#bookmarkInput");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
const bookmarkList = document.querySelector("#bookmarkList");

let bookmarks = [];

const savedBookmarks = localStorage.getItem("bookmarks");
if (savedBookmarks) {
    bookmarks = JSON.parse(savedBookmarks);
}
renderBookmarks();

addBookmarkBtn.addEventListener("click", () => {
    const url = bookmarkInput.value
    console.log(url)
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
    bookmarkInput.value = ''
});

function renderBookmarks() {
    bookmarkList.innerHTML = bookmarks.map((bookmark, index) => {
        return `<li>${bookmark}<button data-index='${index}'>X</button></li>`

    })
        .join('');
}

bookmarkList.addEventListener("click", (event) => {
    console.log(event.target.dataset.index);
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    const index = event.target.dataset.index;
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
});

// Форма

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");

const savedUsername = localStorage.getItem("username");
const savedPassword = localStorage.getItem("password");

if (savedUsername) {
    usernameInput.value = savedUsername
}

if (savedPassword) {
    passwordInput.value = savedPassword
}

saveBtn.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
});