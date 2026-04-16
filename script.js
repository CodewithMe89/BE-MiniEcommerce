import products from "./data.js"

const productDisplay = document.getElementById('productDisplay')

const displayProduct = (products) => {
    products.forEach((currentProduct) => {

        const card = document.createElement('div')
        card.className = 'product-card'
        card.innerHTML = `
        <img src="${currentProduct.imgUrl}" alt="${currentProduct.name}" />
        <h3> ${currentProduct.name} </h3>
        <p class="card-rating-discount-strip">
        <span>${currentProduct.rating} 🌟</span>
        <span>₹${currentProduct.discountPercentage}% off</span>
        </p>
        <p class="card-rating-discount-strip">
        <span class="price">₹${currentProduct.discountPrice}</span>
        <span class="original-price">₹${currentProduct.price}</span>
        </p>
        `

        productDisplay.append(card)
    })
}

displayProduct(products)