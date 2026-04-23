import products from "./data.js"

const productDisplay = document.getElementById('productDisplay');
const genderSelection = document.getElementById("gender-filter");
const genderRadios = document.querySelectorAll('input[name]');
const rating = document.getElementById('rating-input');
const ratingValue = document.getElementById('rating-value');
const searchInput = document.getElementById('searchInput');
const categorybox = document.querySelectorAll('.category-checkbox');
const clearBtn = document.getElementById('clearBtn');

const displayProduct = (products) => {
    productDisplay.innerHTML = "";
    products.forEach((currentProduct) => {

        const card = document.createElement('div')
        card.className = 'product-card'
        card.innerHTML = `
        <div class="image-container">
        <img src="${currentProduct.imgUrl}" alt="${currentProduct.name}" />
        </div>
        
        <h3> ${currentProduct.name} </h3>

        <div class="card-rating-discount-strip">
        <div class="stars">${currentProduct.rating} 🌟</div>
        <span>₹${currentProduct.discountPercentage}% off</span>
        </div>

    <div class="card-rating-discount-strip">
        <span class="price">₹${currentProduct.discountPrice}</span>
        <span class="original-price">₹${currentProduct.price}</span>
    </div>

    <button class="addtoCart"> Add To Cart </button>
        `

        productDisplay.append(card)
    })
}
displayProduct(products)

genderSelection.addEventListener('change', (e) => {
    const filter = e.target.value
    const filteredProduct = products.filter((curr) => curr.gender === filter)
    displayProduct(filteredProduct)
    if (filter === '') {
        displayProduct(products)
    }
})

genderRadios.forEach((radios) => {
    radios.addEventListener('change', (e) => {
        const selectGender = e.target.value;
        const filteredProduct = products.filter((curr) => curr.gender === selectGender)
        displayProduct(filteredProduct)
    })
})

rating.addEventListener('change', (e) => {
    const rating = Number(e.target.value);
    ratingValue.innerText = rating
    const filteredProduct = products.filter((curr) => curr.rating >= rating)
    displayProduct(filteredProduct)
    if (rating === 0) {
        displayProduct(products)
    }
})

searchInput.addEventListener('change', (e) => {
    const searchText = e.target.value.toLowerCase();

    if (searchText === '') {
        displayProduct(products);
    }

    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)
        );
    });
    console.log(filteredProducts);
    displayProduct(filteredProducts);
});

categorybox.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const selectCategory = [];
        categorybox.forEach((cb) => {
            if (cb.checked) {
                selectCategory.push(cb.value)
            }
        });
        if (selectCategory.length === 0) {
            displayProduct(products)
            return;
        }

        const filteredProduct = products.filter((p) =>
            selectCategory.includes(p.category)
        )
        displayProduct(filteredProduct)
    })
})

clearBtn.addEventListener('click', () => {
    genderSelection.value = ''
    genderRadios.forEach((radio) => (radio.checked = false))
    categorybox.forEach((box) => (box.checked = false))
    rating.value = 0
    ratingValue.innerText = 0
    searchInput.value = ''
    displayProduct(products)
    console.log(displayProduct(products))
})

function getStars(rating){
    let stars = '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) {
      stars += '★';
    }
    if (half) stars += '☆';
    return stars;
}