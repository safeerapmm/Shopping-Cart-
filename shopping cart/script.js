const btncart=document.querySelector("#cart-icon")
const cart=document.querySelector(".cart")
const btnclose=document.querySelector("#cart-close")

btncart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})
btnclose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})
document.addEventListener('DOMContentLoaded',loadfood)

function loadfood(){
    loadcontent()
}
function loadcontent(){
    let btnremove=document.querySelectorAll(".cart-remove")
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeitem)
    })

    let qtyelement=document.querySelectorAll('.cart-quantity')
    qtyelement.forEach((input)=>{
        input.addEventListener('change',changeqty)
    }) 

    let cartitem=document.querySelectorAll(".add-cart")
    cartitem.forEach((btn)=>{
        btn.addEventListener('click',addcart)
    })
    updateTotal();
}

function removeitem(){
    if(confirm('Are you sure to remove')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadcontent();
    }
}
function changeqty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1
    }  
    loadcontent()
}

let itemList=[];


function addcart(){
    let food=this.parentElement
    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgsrc=food.querySelector('.food-image').src;

    let newProduct={title,price,imgsrc}

    //Check Product already Exist in Cart
    if(itemList.find((el)=>el.title==newProduct.title)){
     alert("Product Already added in Cart");
     return;
    }else{
     itemList.push(newProduct);
    }
    // console.log(title,price,imgsrc)
    let newproductelement=createcartproduct(title,price,imgsrc)
    let element=document.createElement('div')
    element.innerHTML=newproductelement
    let cartbasket=document.querySelector('.cart-content')
    cartbasket.append(element)
    loadcontent()
}

    function createcartproduct(title,price,imgsrc){
        return `
    <div class="cart-box">
        <img src="${imgsrc}" alt class="cart-img">
        <div class="detail-box">
           <div class="cart-food-title">${title}</div>
             <div class="price-box">
                 <div class="cart-price">${price}</div>
                 <div class="cart-amt">${price}</div>
             </div>
             <input type="number" class="cart-quantity"
                 value="1">
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>`
    }
    function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;
  if(count==0){
    cartCount.style.display='none';
  }
  else{
    cartCount.style.display='block';
  }
}
    
   