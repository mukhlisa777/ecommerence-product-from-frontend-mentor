

const menu = document.querySelector('.HeaderMenu'),
      btnHamburger = document.querySelector('.hamburger'),
      closeMenuBtn = document.querySelector('#closeMenuBtn'),
      cart = document.querySelector('.cart'),
      btnCart = document.querySelector('.btnCart'),
      btnPlus = document.querySelector('#btnPlus'),
      btnMinus = document.querySelector('#btnMinus'),
      productCount = document.querySelector('.count'),
      gallery = document.querySelectorAll('.pictures'),
      heroImg = document.querySelector('.product-hero'),
      btnNext = document.querySelector('.next'),
      btnPrevious = document.querySelector('.previous'),
      btnAddToCard = document.querySelector('.btn'),
      cartCount = document.querySelector('.cart-count'),
      productInShoppingCart = document.querySelector('.products-in-cart'),
      msgEmpty = document.querySelector('.msg__empty'),
      checkout = document.querySelector('.checkout'),
      overlay = document.querySelector('.overlay'),
      productSection = document.querySelector('.productSection');









      
      let productsInCart = 0,
          price = 250.,
          discount = 0.5,
          productGallery,
          productBox,
          productValue = 1;
   




// menu close button function

closeMenuBtn.addEventListener('click', onCloseMenu);
function onCloseMenu() {
    menu.classList.add('hidden');
};

// menu close button function




btnCart.addEventListener('click', openCart);


// product counter plus & minus buttons--->

btnPlus.addEventListener('click', productCountPlus);
btnMinus.addEventListener('click', productCountMinus);

function productCountPlus() {
    setProductCounter(1);
};

function productCountMinus() {
    setProductCounter(-1);
};

// product counter plus & minus buttons--->

function setProductCounter(v) {
    if ((productValue + v) > 0) {
        productValue += v;
        productCount.innerHTML = productValue;
    }
};



function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
};


gallery.forEach(img =>{
    img.addEventListener('click', onClick);
});

function setHeroImage(imageIndex) {
    heroImg.src = `./images/image-product-${imageIndex}.jpg`;
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    gallery[imageIndex-1].classList.add('active');
}

function onClick(e) {
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    e.target.parentElement.classList.add('active');

    heroImg.src = e.target.src.replace('-thumbnail','');
};




btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);


function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
};

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
};




function onHeroImgClick() {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {
            const newNode = productSection.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            productGallery = overlay.querySelectorAll('.pictures');
            productBox = overlay.querySelector('.product-hero');
            productGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });

            const btnNext = overlay.querySelector('.next');
            const btnPrevious = overlay.querySelector('.previous');
            btnNext.addEventListener('click', handleBtnClickNextOverlay);
            btnPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
    }
};




function onBtnOverlayClose() {
    overlay.classList.add('hidden');
};

function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
};

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
};


function onThumbClickLightbox(e) {
    productGallery.forEach(img => {
        img.classList.remove('.active');
    });
    e.target.parentElement.classList.add('.active');
    productBox.src = e.target.src.replace('-thumbnail', '');
};




function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(productBox.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
};

function setOverlayHeroImage(imageIndex) {
    productBox.src = `./images/image-product-${imageIndex}.jpg`;

    productGallery.forEach(img => {
        img.classList.remove('active');
    });

    productGallery[imageIndex-1].classList.add('active');
};




btnAddToCard.addEventListener('click', addToCart);

heroImg.addEventListener('click', onHeroImgClick);




function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}

function updateCartIcon() {
    cartCount.textContent = productsInCart;
    if (productsInCart == 0) {
        if (!cartCount.classList.contains('hidden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

 //hamburger button

btnHamburger.addEventListener('click', hamburgerClick);

function hamburgerClick() {
    menu.classList.remove('hidden');
}
//hamburger button


// open to card

function openCart() {
    cart.classList.toggle('hidden');
}



function updateCheckoutButton() {
    if (productsInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
    } else {
        checkout.classList.remove('hidden');
    }
}








// add to card button

function addToCart() {
    productsInCart += productValue;

    const productElement = `
    <div class="item">
        <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
        <div class="details">
            <div class="product-name">Autumn Limited Edition...</div>
            <div class="price-group">
                <div class="price">$${(price*discount).toFixed(2)}</div>x
                <div class="count">${productsInCart}</div>
                <div class="total-amount">$${(price*discount*productsInCart).toFixed(2)}</div>
        </div>
        </div>
        <img id="btnDelete" src="./images/icon-delete.svg" alt="delete button">
    </div>
    `;



    productInShoppingCart.innerHTML = productElement;

    updateCart();

    const deteleBtn = document.querySelector('#btnDelete');
    deteleBtn.addEventListener('click', onDeleteBtn);
}

// add to card button





// delete button

function onDeleteBtn() {
    productsInCart--;
    updateCart();

    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productsInCart;
    totalAmount.innerHTML = `${(price*discount*productsInCart).toFixed(2)}`;

    if (productsInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}

// delete button




// Message empty function

function updateMsgEmpty() {
    if (productsInCart == 0) {
        if (msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if (!msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.add('hidden');
        }
    }

}

// Message empty function



