export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param);
    return product;
}

// Insert the template into the parentElement
export function renderListWithTemplate(
    template,
    parentElement,
    list,
    position = "afterbegin",
    clear = false,
) {
    const htmlStrings = list.map(template);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}

export function incrementCartCount() {
    const cart = getLocalStorage("so-cart") || [];
    const total = cart.reduce((sum, item) => sum + (item.Quantity || 1), 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = total;
    }
}

// Initialize cart count on page load
export function initializeCartCount() {
    const cart = getLocalStorage("so-cart") || [];
    const total = cart.reduce((sum, item) => sum + (item.Quantity || 1), 0);

    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = total;
    }
}

//
export function alertMessage(message, scroll = true) {
    // Remove any existing alert
    const existing = document.querySelector(".custom-alert");
    if (existing) existing.remove();

    // Create alert element
    const alert = document.createElement("div");
    alert.className = "custom-alert";
    alert.setAttribute("role", "alert");
    alert.innerHTML = `
    ${message}
    <button class="close-alert" aria-label="Close">&times;</button>
  `;

    // Insert at top of <main>
    const main = document.querySelector("main");
    if (main) main.prepend(alert);

    // Scroll to top if needed
    if (scroll) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Close button
    alert.querySelector(".close-alert").addEventListener("click", () => {
        alert.remove();
    });
}