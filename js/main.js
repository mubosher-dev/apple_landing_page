$('.home-wrapper').slick({
    draggable: true,
    autoplay: true, /* this is the new line */
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 1000,
});
$('.service-item_display').slick({
    draggable: true,
    autoplay: true, /* this is the new line */
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    touchThreshold: 1000,
    responsive: [
        {
            breakpoint:1200,
            settings:{
                slidesToShow:2,
                slidesToScroll:2,
            }
        },
        {
          breakpoint: 1008,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings:{
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ],
});
const load = document.querySelector('.load');
setTimeout(() => {
    setTimeout(()=> {
        load.classList.add('animationend');
    },1500)
},3000)
setTimeout(() => {
   $(".loader").css("opacity","0")
   setTimeout(() => {
    $(".loader").css('display',"none");
   }, 6000);
}, 8000);
const wrapperImages = document.querySelectorAll(".about_img");
const wrapper = document.querySelector('.img-modal_section');
const gallery = document.querySelector('#gallary');
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const xBtn = document.querySelector(".cancel-btn");
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar-nav');
const navItem = document.querySelectorAll('.nav-item');
const addCartBtn = document.querySelectorAll(".addCartBtn");
const evalProducts = document.querySelector(".index");
const shopParent = document.querySelector(".shopping-item_display");
const time = document.querySelector("#time");
const shopBtn = document.querySelector('#shopBtn');
const shoppingCart = document.querySelector("#shopping");
const totalPoint = document.querySelector(".totals");
const navBtn = document.querySelector("#navBtn");
const navigation = document.querySelector(".navigation")
let date = new Date();
let productIndex = 1;
let index ;
let defaultPrice = [300,]
let univerPrice ;
navLinks.forEach((navBtn,i) => {
    navBtn.addEventListener('click', (e) => {
        navbar.querySelector(".active").classList.remove("active");
        navItem[i].classList.add("active");
        navigation.classList.remove("active");
    })
})
wrapperImages.forEach((wrapperBtn,i) => {
    wrapperBtn.addEventListener('click',() => {
        wrapper.classList.add("active");
        gallery.src = wrapperBtn.src;
        index = i;
        slider();
    })
})
nextBtn.addEventListener("click", () => {
    if(index < wrapperImages.length){
        gallery.src = wrapperImages[index].src;
        index++
    }
    else{
        index = 0;
    }
})
prevBtn.addEventListener("click", () => {
    if(index > 0 && index < wrapperImages.length){
        index--;
        gallery.src = wrapperImages[index].src;
    }
    else{
        index = 0;
    }
})
xBtn.addEventListener('click',() => {
    wrapper.classList.remove("active");
})
function slider(){
    setInterval(() => {
        if(index < wrapperImages.length){
            index++
            gallery.src = wrapperImages[index].src;
        }
        else{
            index = 0;
        }
    },2000);
}

addCartBtn.forEach((proBtn,index) => {
    proBtn.addEventListener("click",function(e) {
            productIndex++
            evalProducts.textContent = productIndex;
            addCarts(e)
    })
})
shopBtn.addEventListener('click',function(){
    shoppingCart.classList.toggle("active")
})

navBtn.addEventListener('click',()=>{
    navigation.classList.toggle("active");
})

function addCarts(e){
    const parent = e.target.parentElement.parentElement;
    let img = parent.querySelector("img");
    let div = document.createElement("div");
    let h3 = parent.querySelector("h3");
    let p = parent.querySelector("p");
    let span = parent.querySelector("span");
    div.classList.add("main-items");

    div.innerHTML = `
        <div class="main_shop-items_display">
            <div class="main-shop_img">
                <img src="${img.src}" alt="shopping">
            </div>
            <div class="main_shop-desc">
                <h3>${h3.innerText}</h3>
                <p>${p.innerText.slice(0,25)}</p>
                <div class="cancel-shop fas fa-times"></div>
            </div>
        </div>
        <div class="main-shop_price">
            <h2> $<span>${span.innerText}</span></h2>
        </div>
    `;
    defaultPrice.push(parseInt(span.innerText));
    shopParent.append(div);
    totalPoint.textContent = defaultPrice.reduce(function(a,b){
        return a + b;
    });
}
function removeShopList(e){
    if(e.target.classList[0] === "cancel-shop"){
        const item = e.target.parentElement.parentElement.parentElement;
        const priceRemove = item.querySelector("span").textContent;
        shopParent.removeChild(item);
        productIndex--;
        evalProducts.textContent = productIndex;
        totalPoint.textContent = totalPoint.textContent - priceRemove;
        defaultPrice.pop();
    }
}

time.textContent = date.getFullYear();
shopParent.addEventListener('click',removeShopList);