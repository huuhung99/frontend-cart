var userId=2;
var apiUrl="https://eprojectbytranxuantung.herokuapp.com/api/products";
var content=``;
axios.get(apiUrl)
	.then(res => {
		var data = res.data;
		data.forEach(element => {
			content+=`
			<div class="col-12 col-sm-6 col-md-4 single_gallery_item women wow fadeInUpBig" data-wow-delay="0.2s"">
				<div class="product-img" >
					<img src="/img/product-img/product-${element.id%12}.jpg" alt="">
				</div>
				<div class="product-description">
					<div>
						<a href="/product-details.html?id=${element.id}" data-toggle="modal" ><i class="ti-plus"></i></a>
					</div>
					<p>J${element.name}</p>
				</div>
			</div>
			`;
		});
		document.querySelector(".karl-new-arrivals").innerHTML=content;
});
var apiUrl="https://eprojectbytranxuantung.herokuapp.com/api/carts/getCartInUser?userId="+userId;
var contentGetCart=``;
axios.get(apiUrl)
	.then(res => {
		var data = res.data;
		console.log(data);
		contentGetCart+=`
			<a href="/cart.html?id=${this.userId}" id="header-cart-btn" target="_blank"><span class="cart_quantity">${data.cart_Items.length}</span> <i class="ti-bag"></i></a>
			`;  
		// document.querySelector('.cartdetail').innerHTML=contentGetCart;
		document.querySelector('.cartdetailindex').innerHTML=contentGetCart;
})