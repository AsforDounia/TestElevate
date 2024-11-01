// JS for Single product detail


        var ProductImg = document.getElementById("product-img");//larger image
        var SmallImg = document.getElementsByClassName("small-img");//it returns list of 4 images having index 0,1,2,3 as we have 4 images with class name "small0-img" 

        SmallImg[0].onclick = function()//when user click on first image or images at 0 index, it will display as ProdcutImg.src replace with clicked or SmallImg[0], so we get smallimg[0] in bigger form, similarly when click on smallimg[1], it will display in bigger picture and so on 
        {
            ProductImg.src = SmallImg[0].src;   
        }

        SmallImg[1].onclick = function()
        {
            ProductImg.src = SmallImg[1].src;   
        }

        SmallImg[2].onclick = function()
        {
            ProductImg.src = SmallImg[2].src;   
        }

        SmallImg[3].onclick = function()
        {
            ProductImg.src = SmallImg[3].src;   
        }

// ==============================================================================
// function categoryFilter(category) {
    
//     let Products = document.getElementsByClassName('Products');
//     if (category === "All") {
//         for (let product of Products) {
//             product.style.display = 'block';
//         }
//         return;
//     }

//     let ProductsCategory = document.getElementsByClassName(category);

//     for (let product of Products) {
//         product.style.display = 'none';
//     }
    
//     for (let product of ProductsCategory) {
//         product.style.display = 'block';
//     }
// }


// function filterPrice() {
//     const maxPrice = parseInt(document.getElementById("vol").value, 10);
//     const products = document.getElementsByClassName("Products");

//     for (let i = 0; i < products.length; i++) {
//         const priceText = products[i].querySelector("p").textContent;
//         const productPrice = parseInt(priceText.replace('$', ''), 10);
//         if (productPrice <= maxPrice) {
//           products[i].style.display = 'block';
//         } else {
//             products[i].style.display = 'none';

//         }
//     }
// }



// function applyFilters() {
//     const category = document.getElementById("categorySelect").value; 
//     const maxPrice = parseInt(document.getElementById("vol").value, 10); 
//     const products = document.getElementsByClassName("Products");

//     for (let product of products) {
//         const priceText = product.querySelector("p").textContent;
//         const productPrice = parseInt(priceText.replace('$', ''), 10);
//         const categoryVisible = category === "All" || product.classList.contains(category);
//         product.style.display = (productPrice <= maxPrice && categoryVisible) ? 'block' : 'none';
//     }
// }

// function updatePrice(value) {
//     document.getElementById("priceValue").textContent = value+"$";
//     applyFilters()
// }
 

// ===============================================
function showProductDetails(productId) {
    window.location.href = `product-detail.html?productId=${productId}`;
}
function displayProductDetails(productId){
    const allProducts = document.querySelectorAll('.single-product .row');
    allProducts.forEach(product => {
        const id = product.getAttribute('id');
        if (id === productId) {
            product.style.display = 'flex' ;
        }else{
            product.style.display = 'none' ;
        }
    });
    
}
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('product-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('productId');
        displayProductDetails(productId);
    }
});

// =========================================

function addToCart(productId) {
    
    const productElement = document.getElementById(productId);
    const product = {
        id: productId,
        name: productElement.querySelector('h4').innerText,
        price: parseFloat(productElement.querySelector('p').innerText.replace('$', '')),
        quantity: 1, 
        image: productElement.querySelector('img').src,
        classes: productElement.className 
    };
    let storedProduct = localStorage.getItem(productId);
        if (storedProduct) {
            storedProduct = JSON.parse(storedProduct);
            storedProduct.quantity += 1;
            storedProduct.price += storedProduct.price ;
        } else {
            storedProduct = product;
        }
    
        localStorage.setItem(productId, JSON.stringify(storedProduct));
    
        displayCart();

}


function displayCart() {
    const cartSection = document.getElementById('cartSection');
    cartSection.innerHTML = '';

    Object.keys(localStorage).forEach(key => {
        const product = JSON.parse(localStorage.getItem(key));
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cartProduct';
        cartItem.innerHTML = `
            <div class="cartImg">
                <img src="${product.image}">
            </div>
            <div>
                <h4>${product.name}</h4>
                <p>Price $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <a href="#" onclick="removeFromCart('${product.id}')">Remove</a>
            </div>
        `;
        cartSection.appendChild(cartItem);
    });
    updateCartTotal(); // Met à jour le total lors de l'affichage du panier
}


function removeFromCart(productId) {
    localStorage.removeItem(productId);
    displayCart();
}
