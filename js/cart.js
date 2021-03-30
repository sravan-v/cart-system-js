if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// After DOM Load
function ready() {
    // add to cart
    let addBtn = document.getElementsByClassName('addToCart');
    for (let i = 0; i < addBtn.length; i++) {
        let btn = addBtn[i];
        btn.addEventListener('click', addToCart);
    }

    // on change 
    let quantityInput = document.getElementsByClassName('productValue');
    for (var i = 0; i < quantityInput.length; i++) {
        let quantityValue = quantityInput[i];
        quantityValue.addEventListener('change', quantityUpdate);
    }

    // delete 
    let removeItems = document.getElementsByClassName('removeItem');
    for (var i = 0; i < removeItems.length; i++) {
        let removeItem = removeItems[i];
        removeItem.addEventListener('click', removeItem);
    }
}

function removeItem(e) {
    let cartItem = e.target;
    cartItem.parentElement.parentElement.remove();
    updateCards();
    if (document.getElementsByClassName('removeItem').length == 0) {
        document.getElementsByClassName('cartListWrapper')[0].style.display = 'none';
        document.getElementsByClassName('totalWrapper')[0].style.display = 'none';
    }

}

function addToCart(e) {
    let button = e.target;
    var cartItem = button.parentElement.parentElement;
    let cardTitle = cartItem.getElementsByClassName('cardTitle')[0].innerText;
    let cardImg = cartItem.getElementsByClassName('cardImg')[0].src;
    let price = cartItem.getElementsByClassName('price')[0].innerText;
    addItemToCart(cardTitle, cardImg, price);
    updateCards();
}

function quantityUpdate(e) {
    var input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCards();
}

function addItemToCart(cardTitle, cardImg, price) {
    document.getElementsByClassName('cartListWrapper')[0].style.display = 'block';
    document.getElementsByClassName('totalWrapper')[0].style.display = 'block';
    let cartRow = document.createElement('DIV');
    cartRow.classList.add('cart-detail-row');
    let cartListWrapper = document.getElementsByClassName('cartListWrapper')[0];
    let title = document.getElementsByClassName('productTitle');
    for (i = 0; i < title.length; i++) {
        if (title[i].innerText == cardTitle) {
            alert('Already Added to the cart');
            return;
        }
    }
    let cartData = `
        <div class="row">
            <div class="col s1">
                <img class="materialboxed productImg" width="100%" src="${cardImg}" alt="">
            </div>
            <div class="col s7">
                <p class="productTitle">${cardTitle}</p>
            </div>
            <div class="col s1">
                <p class="productPrice align-center">${price}</p>
            </div>
            <div class="col s1">
                <input type="number" class="productValue" value="1"/>
            </div>
            <div class="col s2">
                <button class="waves-effect waves-light btn removeItem">Remove</button>
            </div>
        </div>
    `;
    cartRow.innerHTML = cartData;
    cartListWrapper.appendChild(cartRow);
    cartRow.getElementsByClassName('productValue')[0].addEventListener('change', quantityUpdate);
    cartRow.getElementsByClassName('removeItem')[0].addEventListener('click', removeItem);
}

function updateCards() {
    let cardContainer = document.getElementsByClassName('cartListWrapper')[0];
    let cardsList = cardContainer.getElementsByClassName('row');
    let total = 0;
    for (let i = 0; i < cardsList.length; i++) {
        let cardListItems = cardsList[i];
        var productPrice = cardListItems.getElementsByClassName('productPrice')[0];
        var productValue = cardListItems.getElementsByClassName('productValue')[0].value;
        var parsedPrice = parseFloat(productPrice.innerText.replace('$', ' '));
        total = total + (parsedPrice * productValue);
    }
    total = Math.round(total * 100) / 100;
    // console.log(productPrice, productValue, val, total);
    document.getElementsByClassName('totalValue')[0].innerText = 'Total: $' + total;
}