function filterProducts(criteria) {
    const products = document.querySelectorAll('.product');
    const productArray = Array.from(products);

    switch (criteria) {
        case 'price-asc':
            productArray.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
            break;
        case 'price-desc':
            productArray.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
            break;
        case 'name-asc':
            productArray.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
            break;
        case 'name-desc':
            productArray.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
            break;
        case 'stock':
            productArray.forEach(product => {
                if (product.dataset.stock === 'true') {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
            return;
        default:
            break;
    }

    const container = document.querySelector('.products-container');
    container.innerHTML = '';
    productArray.forEach(product => container.appendChild(product));
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert(`${button.previousElementSibling.previousElementSibling.innerText} sepete eklendi!`);
    });
});
