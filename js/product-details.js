var urlParam=new URLSearchParams(window.location.search);
var productID=urlParam.get('id');
var apiUrl="https://eprojectbytranxuantung.herokuapp.com/api/items/getByProductId?productId="+productID;
var content=``;
// itemId để submit form add item  to cart
// var itemId=parseInt(1);
var itemId=1;
// cartId để submit form add item  to cart
var userId=2;
var cartId=4;
if(productID!=null) axios.get(apiUrl)
	.then(res => {
		var data = res.data;
		var index=0;
		data.forEach(element => {
			if(index==0){
				showPrice(element);
				index+=1;
			}
			content+=`<li><a href="#" onclick = 'showPrice(${JSON.stringify(element)})'>${element.size}</a></li>`;  
		});
		document.querySelector('.sizeProduct').innerHTML=content;
})
function showPrice(item)
{
	event.preventDefault();
	itemId=item.id;
	document.querySelector('.priceabc').innerText=String(item.sellPrice);
	document.querySelector('.title').innerText=String(item.name);
}
var apiGetAllItemUrl="https://eprojectbytranxuantung.herokuapp.com/api/items";
var contentGetAll=``;
axios.get(apiGetAllItemUrl)
	.then(res => {
		var data = res.data;
		data.forEach(element => {
			contentGetAll+=`<div class="single_gallery_item">
			<div class="product-img">
				<img src="" alt="">
				<div class="product-quicview">
					<a href="#" data-toggle="modal" data-target="#quickview"><i class="ti-plus"></i></a>
				</div>
			</div>
			<div class="product-description">
				<h4 class="product-price">${element.sellPrice}</h4>
				<p>${element.name}</p>
				<p>${element.size}</p>
				<a href="#" class="add-to-cart-btn">ADD TO CART</a>
			</div>
		</div>`;  
		});
		document.querySelector('.you_make_like_slider').innerHTML=contentGetAll;
})
const btnAddToCart = document.getElementById("addtocart");
function addToCart(){
	console.log(itemId);	
	event.preventDefault(); // dòng này ngăn cho trình duyệt load lại trang nó có sẵn do cái sự kiện của button
	var urlAddItemToCart="https://eprojectbytranxuantung.herokuapp.com/api/cart_items?cartId="+cartId+"&itemId="+itemId;
	axios({
		method: 'post',
		url: urlAddItemToCart,
		data: {
			quantity:document.getElementById('qty').value,
		},
		headers: { "Content-Type": "application/json" },
		})
		.then(function (response) {
			console.log(document.getElementById('qty').value);
			console.log(response);
		})
		.catch(function (response) {
			console.log(response);
	});
	// window.location.href="index.html";
}
// get cart bt id;
// var getCartById="https://eprojectbytranxuantung.herokuapp.com/api/cart_items/"+cartId;
var apiUrl="https://eprojectbytranxuantung.herokuapp.com/api/carts/getCartInUser?userId="+userId;
var contentGetCart=``;
axios.get(apiUrl)
	.then(res => {
		var data = res.data;
		// console.log(data);
		contentGetCart+=`
			<a href="/cart.html?id=${this.userId}" id="header-cart-btn" target="_blank"><span class="cart_quantity">${data.cart_Items.length}</span> <i class="ti-bag"></i></a>
			`;  
		document.querySelector('.cartdetail').innerHTML=contentGetCart;
		// document.querySelector('.cartdetailindex').innerHTML=contentGetCart;
})