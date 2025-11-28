const productsContainer = document.querySelector('.products');

fetch('scripts/products.json')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <span>$${product.price}</span>
                <button>Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error cargando productos:', error));
