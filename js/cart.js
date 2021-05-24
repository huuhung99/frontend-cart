var urlParam=new URLSearchParams(window.location.search);
var userId=urlParam.get('id');
var apiUrl="https://eprojectbytranxuantung.herokuapp.com/api/carts/getCartInUser?userId="+userId;
var content=``;
var contentGetCart=``;
var data;
axios.get(apiUrl)
	.then(res => {
		data = res.data;
		console.log(data);
		contentGetCart+=`
			<a href="/cart.html?id=${this.userId}" id="header-cart-btn" target="_blank"><span class="cart_quantity">${data.cart_Items.length}</span> <i class="ti-bag"></i></a>
			`;  
		document.querySelector('.cartdetail').innerHTML=contentGetCart;
		data.cart_Items.forEach(element => {
			content+=`
			<tr>
				<td class="cart_product_img d-flex align-items-center">
					<a href="#"><img src="/img/product-img/product-${element.item.id%13}.jpg" alt="Product"></a>
					<h6>${element.item.name}</h6>
				</td>
				<td class="price"><span>${element.item.sellPrice}</span></td>
				<td class="qty">
					<div class="quantity">
						<span class="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i class="fa fa-minus" aria-hidden="true"></i></span>
						<input type="number" class="qty-text" id="qty" step="1" min="1" max="99" name="quantity" value="${element.quantity}">
						<span class="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-plus" aria-hidden="true"></i></span>
					</div>
				</td>
				<td class="total_price"><span>300000</span></td>
			</tr>`;
		});
		document.querySelector('table tbody#items').innerHTML=content;
});
function deleteAllItems(){
	data.cart_Items.forEach(element=>{
		var urlDelete="https://eprojectbytranxuantung.herokuapp.com/api/cart_items/"+element.id;
		axios.delete(urlDelete)
		.then(function (response) {
			console.log(response);
		})
		setTimeout("location.reload(true);", 2000);
	});
	setTimeout(function(){ alert("xin chờ 1 vài giây"); }, 500);
}