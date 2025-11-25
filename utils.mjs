export async function loadHeader() {
    try {
        const headerHTML = await fetch("/header.html").then(res => res.text());
        document.querySelector("#main-header").innerHTML = headerHTML;
    } catch (error) {
        console.error("Error cargando el header:", error);
    }
}

export async function loadFooter() {
    try {
        const footerHTML = await fetch("/footer.html").then(res => res.text());
        document.querySelector("#main-footer").innerHTML = footerHTML;
    } catch (error) {
        console.error("Error cargando el footer:", error);
    }
}

export async function loadHeaderFooter() {
    await loadHeader();
    await loadFooter();
}


