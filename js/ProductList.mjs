import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
      <p>${flagDiscountedProduct(product).toFixed(0)}% Off</p>
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);

    }

}

function flagDiscountedProduct(product) {
    const finalPrice = Number(product.FinalPrice);
    const suggestPrice = Number(product.SuggestedRetailPrice);

    // avoid invalid or zero values
    if (!suggestPrice || suggestPrice <= 0) return 0;

    // ONLY calculate discount if final price is lower
    if (finalPrice >= suggestPrice) return 0;

    const discountPercentage = ((suggestPrice - finalPrice) / suggestPrice) * 100;
    return discountPercentage;
}