document.addEventListener('DOMContentLoaded', function () {
    updateTotalCart() ;

    if (window.location.pathname.includes('product-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('productId');
        displayProductDetails(productId);



        const productElement = document.getElementById(productId);
        const quantityElement = productElement.querySelector("input[type='number']");
        const detailQuantity = JSON.parse(localStorage.getItem(productId))?.quantity;
        if (detailQuantity !== undefined) {
            quantityElement.value = detailQuantity;
        };
    }
    if (window.location.pathname.includes('cart.html')) {
        displayCartProducts()
    }

});



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
function categoryFilter(category) {
    
    let Products = document.getElementsByClassName('Products');
    if (category === "All") {
        for (let product of Products) {
            product.style.display = 'block';
        }
        return;
    }

    let ProductsCategory = document.getElementsByClassName(category);

    for (let product of Products) {
        product.style.display = 'none';
    }
    
    for (let product of ProductsCategory) {
        product.style.display = 'block';
    }
}


function filterPrice() {
    const maxPrice = parseInt(document.getElementById("vol").value, 10);
    const products = document.getElementsByClassName("Products");

    for (let i = 0; i < products.length; i++) {
        const priceText = products[i].querySelector("p").textContent;
        const productPrice = parseInt(priceText.replace('$', ''), 10);
        if (productPrice <= maxPrice) {
          products[i].style.display = 'block';
        } else {
            products[i].style.display = 'none';

        }
    }
}



function applyFilters() {
    const category = document.getElementById("categorySelect").value; 
    const maxPrice = parseInt(document.getElementById("vol").value, 10); 
    const products = document.getElementsByClassName("Products");

    for (let product of products) {
        const priceText = product.querySelector("p").textContent;
        const productPrice = parseInt(priceText.replace('$', ''), 10);
        const categoryVisible = category === "All" || product.classList.contains(category);
        product.style.display = (productPrice <= maxPrice && categoryVisible) ? 'block' : 'none';
    }
}

function updatePrice(value) {
    document.getElementById("priceValue").textContent = value+"$";
    applyFilters()
}
 



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





// =========================================
function addToCart(productId) {
   
    const productElement = document.getElementById(productId);
    const product = {
        id: productId,
        name: productElement.querySelector('h4').innerText,
        SinglePrice: parseFloat(productElement.querySelector('p').innerText.replace('$', '')),
        totalPrice: parseFloat(productElement.querySelector('p').innerText.replace('$', '')),
        quantity: 1, 
        size : "XL",
        images: productElement.querySelector('img').src,
        classes: productElement.className 
    };

    let storedProduct = localStorage.getItem(productId);
    
    if (storedProduct) {
        storedProduct = JSON.parse(storedProduct);
        if (window.location.pathname.includes('product-detail.html')) {
            const quantityElement = productElement.querySelector("input[type='number']").value;
            const sizeElement = productElement.querySelector("select").value;
            storedProduct.size = sizeElement ;
            storedProduct.quantity = parseInt(quantityElement);

        }
        else{
            storedProduct.quantity += 1;

        }
        storedProduct.totalPrice = storedProduct.SinglePrice * storedProduct.quantity;
    } else {
        storedProduct = product;
    }

    localStorage.setItem(productId, JSON.stringify(storedProduct));

    
    updateTotalCart() ;


}

function updateTotalCart() {
    let totalPanierPrice = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedProduct = localStorage.getItem(key);

        if (storedProduct) {
            const productData = JSON.parse(storedProduct);
            totalPanierPrice += productData.totalPrice;
        }
    }
    // totalPanierPrice += 30;
    const totalPanierElement = document.getElementById('totalPanier');
    totalPanierElement.innerHTML = `$${totalPanierPrice.toFixed(2)}`; 

}


function removeFromCart(productId) {
    localStorage.removeItem(productId);
    displayCartProducts();
}


function updateQuantity(productId, quantity) {
    quantity = parseInt(quantity);

    // Vérifier si la nouvelle quantité est 0
    if (quantity === 0) {
        if (confirm("Tu veux supprimer ce produit ?")) {
            removeFromCart(productId);
        } else {
            const productElement = document.getElementById(productId);
            const quantityInput = productElement.querySelector("input[type='number']");
            quantityInput.value = 1; 
            updateQuantity(productId, 1);
        }
        return; 
    }
    const storedProduct = JSON.parse(localStorage.getItem(productId));
    storedProduct.quantity = parseInt(quantity);
    storedProduct.totalPrice = storedProduct.SinglePrice * storedProduct.quantity;
    localStorage.setItem(productId, JSON.stringify(storedProduct));
    

    const productDiv = document.getElementById(productId);
    productDiv.querySelector('span').innerText = `$${storedProduct.totalPrice.toFixed(2)}`;
    

    updateTotalCart() ;
}





function displayCartProducts() {
    const cartContainer = document.getElementById("cartProducts");
    cartContainer.innerHTML = ""; 
    // let totalCartPrice = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key === "TotalpanierPrice") continue;
        
        const storedProduct = JSON.parse(localStorage.getItem(key));

        // totalCartPrice += storedProduct.totalPrice;

        // Create HTML structure for each product in the cart
        const productHTML = `
            <div class="cartProducts ${storedProduct.classes}" id="${storedProduct.id}">
                <div class="cartSingleProduct">
                    <div class="cartImg">
                        <img src="${storedProduct.images}" onclick="showProductDetails('${storedProduct.id}')">
                    </div>
                    <div>
                        <h4>${storedProduct.name}</h4>
                        <p>Price $${storedProduct.SinglePrice.toFixed(2)}</p>
                        <a href="#" onclick="removeFromCart('${storedProduct.id}')">Remove</a>
                    </div>
                </div>
                <div class="divInputCart">
                    <input type="number" value="${storedProduct.quantity}" class="cartInput" 
                        onchange="updateQuantity('${storedProduct.id}', this.value)">
                </div>
                <div>
                    <span>$${storedProduct.totalPrice.toFixed(2)}</span>
                </div>
            </div>
        `;


        cartContainer.insertAdjacentHTML("beforeend", productHTML);
    }

    updateTotalCart();
    // const totalPanier = document.getElementById("totalPanier");
    // totalPanier.innerHTML = `$${totalCartPrice.toFixed(2)}`;
}



// ==========================================================================
// ==========================================================================
function validateForm() {
    let isValid = true;

    // Name Validation
    var firstNameField = document.getElementById('firstName');
    var lastNameField = document.getElementById('lastName');
    var firstName = firstNameField.value.trim();
    var lastName = lastNameField.value.trim();
    var namePattern = /^[A-Za-z]+$/;

    if (!firstName.match(namePattern) || firstName === "") {
        isValid = false;
        firstNameField.style.borderColor = "red";
        alert('your First Name is invalid');
        return false;
    } 
    else {
        isValid = false;
        firstNameField.style.borderColor = "green";

    }
    if (!lastName.match(namePattern) || lastName === "") {
        isValid = false;
        lastNameField.style.borderColor = "red";
        alert('your Last Name is invalid');
        return false;
    }
    else {
        lastNameField.style.borderColor = "green";
        
    }

    // Country Validation
    var countryField = document.querySelector('select');
    if (countryField.value === "") {
        isValid = false;
        countryField.style.borderColor = "red";
        alert("Please select a country");
        return false; // Exit the function early
    } else {
        countryField.style.borderColor = "green";
    }

    // Street Address Validation
    var streetAddressField = document.querySelector('input[placeholder="Street Address"]');
    var streetAddress = streetAddressField.value.trim();
    if (streetAddress === "") {
        isValid = false;
        streetAddressField.style.borderColor = "red";
        alert("Street Address is required");
        return false; // Exit the function early
    } else {
        streetAddressField.style.borderColor = "green";
    }

    // Town / City Validation
    var townField = document.querySelector('input[placeholder="Town / City"]');
    var town = townField.value.trim();
    if (town === "") {
        isValid = false;
        townField.style.borderColor = "red";
        alert("Town / City is required");
        return false; // Exit the function early
    } else {
        townField.style.borderColor = "green";
    }

    // State / County Validation
    var stateField = document.querySelector('input[placeholder="State / County"]');
    var state = stateField.value.trim();
    if (state === "") {
        isValid = false;
        stateField.style.borderColor = "red";
        alert("State / County is required");
        return false; // Exit the function early
    } else {
        stateField.style.borderColor = "green";
    }

    // Postcode / ZIP Validation
    var postcodeField = document.querySelector('input[placeholder="Postcode / ZIP"]');
    var postcode = postcodeField.value.trim();
    if (postcode === "") {
        isValid = false;
        postcodeField.style.borderColor = "red";
        alert("Postcode / ZIP is required");
        return false; // Exit the function early
    } else {
        postcodeField.style.borderColor = "green";
    }

    // Phone number validation
    var phoneField = document.getElementById("phone");
    var phone = phoneField.value.trim();
    var phonePattern = /^(06|07|05)[0-9]{8}$/;

    if (!phone.match(phonePattern) || phone === "") {
        isValid = false;
        phoneField.style.borderColor = "red";
        alert("Phone number is invalid");
        return false;
    } else {
        phoneField.style.borderColor = "green";
    }

    // Email validation
    var emailField = document.getElementById("email");
    var email = emailField.value.trim();
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.match(emailPattern)) {
        isValid = false;
        emailField.style.borderColor = "red";
        alert("Email address is invalid");
        return false;
    } else {
        emailField.style.borderColor = "green";
    }


    return isValid; 
}



// ============================
// function showMenuuBar(){
//     const menu = document.querySelector("header nav ul:nth-child(2)");
//     menu.style.display = "block";
// }

function showMenuBar() {
    const menu = document.querySelector(".menu-bar-side");
    const menuIcon = document.querySelector(".fa-bars");
    const closeIcon = document.querySelector(".fa-remove");

    menu.style.display = "block"; // Show the menu
    menuIcon.style.display = "none"; // Hide menu icon
    closeIcon.style.display = "block"; // Show close icon
}

function hideMenuBar() {
    const menu = document.querySelector(".menu-bar-side");
    const menuIcon = document.querySelector(".fa-bars");
    const closeIcon = document.querySelector(".fa-remove");

    menu.style.display = "none"; // Hide the menu
    menuIcon.style.display = "block"; // Show menu icon
    closeIcon.style.display = "none"; // Hide close icon
}
