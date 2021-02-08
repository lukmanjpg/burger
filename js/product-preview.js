$('.toggleNavInfo').on('click',function(){
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$('.media-info').css({
			bottom: '0px',
		});
	}else {
		$('.media-info').css({
			bottom: '-'+ $('.media-info').outerHeight() +'px',
		});
	}
});
$('.burger-holder').on('click',function(){
	$(this).toggleClass('active');
	$('.media-menu').addClass('active');
});
$('.closeMediaMenu').on('click',function(){
	$('.media-menu').removeClass('active');
	$('.burger-holder').removeClass('active');
})


let arrowMedia = document.querySelectorAll('.arrow-holder');
let mediaDropdown = document.querySelectorAll('.media-dropdown');
let dropdownWraps = document.querySelectorAll('.dropdown-wrap');
for(let i = 0;i<arrowMedia.length;i++){
	arrowMedia[i].addEventListener('click',function(){
		this.classList.toggle('active');
		if(arrowMedia[i].classList.contains('active')){
			dropdownWraps[i].style.height = ''+mediaDropdown[i].offsetHeight+'px';
		}else {
			dropdownWraps[i].style.height = '';
		}
	})
};
$(window).on('scroll',fixedHeader);
function fixedHeader(){
	let result = $('.top').outerHeight();
	if($(window).scrollTop() >= result){
		$('.top').css({
			marginBottom: $('.header').outerHeight(),
		});
		$('.header').addClass('fixed-header');
	}
	else{
		$('.top').css({
			marginBottom: '0',
		});
		$('.header').removeClass('fixed-header');
	}
};

$('.media-info').css({
	bottom: '-'+ $('.media-info').outerHeight() +'px',
});

$('.product-info .left').css({
	height: $('.product-info .left').outerWidth(),
});
initAllRatings();
// Система рейтинга
function initAllRatings(){
	let ratings = document.querySelectorAll('.rating');
	if(ratings.length > 0){
		initRatings(ratings);
	}
}
function initRatings(ratings){
	let ratingActive,ratingValue;
	for(let i = 0;i<ratings.length;i++){
		let rating = ratings[i];
		initRating(rating);
	}
	function initRating(rating){
		initRatingVars(rating);
		setWidthRating();
		if(rating.classList.contains('set__active')){
			setRating(rating);
		}
	}
	function initRatingVars(rating){
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}

	function setWidthRating(index=ratingValue.innerHTML){
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}

	function setRating(rating){
		const ratingItems = rating.querySelectorAll('.rating__item');
		for (let i = 0; i < ratingItems.length; i++) {
			let ratingItem = ratingItems[i];
			ratingItem.addEventListener('mouseenter',function(){
				initRatingVars(rating);
				setWidthRating(ratingItem.value);
			});
			ratingItem.addEventListener('mouseleave',function(){
				setWidthRating();
			});
			ratingItem.addEventListener('click',function(){
				initRatingVars(rating);
				ratingValue.innerHTML = ratingItem.value;
				setWidthRating();
			})
		}

	}
}
commentsTabs();
function commentsTabs(){
	let tabs = document.querySelectorAll('.comments-tab');
	let content = document.querySelectorAll('.comments-content-tab');
	for(let i = 0;i<tabs.length;i++){
		tabs[i].addEventListener('click',function(){
			let attr = this.getAttribute('data-tab');
			for(let i = 0;i<tabs.length;i++){
				tabs[i].classList.remove('active');
			}
			for(let i = 0;i<content.length;i++){
				content[i].classList.remove('active');
				if(content[i].classList.contains(attr)){
					content[i].classList.add('active');
				}
			}
			this.classList.add('active');
		});
		
	};
};


// Обьект с информацией о покупке
let cart = {};
// Обьект с информацией о Избранных продуктов
let likedProduct = {};
// Обьект с id выбранного продукта 
let singleItemId = {};
// Проверка LocalStorage
checkCart();
function checkCart(){
	let result = localStorage.getItem('cart');
	if (result != null) {
		cart = JSON.parse(result);
	}
}
//Проверка LocalStorage
checkLikeProduct();
function checkLikeProduct(){
	let result = localStorage.getItem('likedProduct');
	if (result != null) {
		likedProduct = JSON.parse(result);
	}
}
checkSingleCart();
function checkSingleCart(){
	let result = localStorage.getItem('singleItem');
	if (result != null) {
		singleItemId = JSON.parse(result);
	}
}
filterOutProduct();
function filterOutProduct(){
	let indexFind = shopProduct.filter(element => element.id === +singleItemId['item']);
	let category = indexFind[0].category;
	let filter = shopProduct.filter(element => element.category === category);
	let totalFilter = filter.filter(element => element.id != +singleItemId['item']);
	outProduct(totalFilter);
}
// Вывод продуктов
function outProduct(arrayProduct){
	let out = '';
	for(let i = 0;i<arrayProduct.length;i++){
		out += '<div class="product-item">';
		out += '<div class="product-top">';
		if(arrayProduct[i].sale === "yes"){
			out += '<span class="onsale">SALE</span>'
		}
		out += '<div class="product-effect"></div>';
		if(likedProduct[arrayProduct[i].id] != undefined){
			out += '<i class="fas fa-heart addToLiked c-pointer active" product-id="'+ arrayProduct[i].id +'"><div class="tooltipLike">Добавлено в<br> избранные</div></i>';
		}else {
			out += '<i class="fas fa-heart addToLiked c-pointer" product-id="'+ arrayProduct[i].id +'"><div class="tooltipLike">Добавлено в<br> избранные</div></i>';
		}
		out += '<img src="img/'+arrayProduct[i].image+'" alt="" class="product-item-img">';
		out += '</div>';
		out += '<div class="product-info-holder">';
		out += '<div class="rating product-rating">';
		out += '<div class="rating__body">';
		out += '<div class="rating__active"></div>';
		out += '<div class="rating__items">';
		out += '<input type="radio" name="rating" value="1" class="rating__item">';
		out += '<input type="radio" name="rating" value="2" class="rating__item">'
		out += '<input type="radio" name="rating" value="3" class="rating__item">';
		out += '<input type="radio" name="rating" value="4" class="rating__item">';
		out += '<input type="radio" name="rating" value="5" class="rating__item">'
		out += '</div>';
		out += '</div>';
		out += '<div class="rating__value">'+arrayProduct[i].rating+'</div>';
		out += '</div>';
		out += '<span link="product-preview.html" class="popular-product-title watchAboutProduct" product-id="'+ arrayProduct[i].id +'">'+ arrayProduct[i].name +'</span>';
		out += '<p class="popular-product-text">'+arrayProduct[i].description+'</p>';
		out += '<div class="product-bottom-holder">'
		out += '<span class="d-flex a-center">'
		if(arrayProduct[i].old_price != "no"){
			out += '<span class="old-price">';
			out += '<span class="old-price-units">'+ arrayProduct[i].units +'</span>';
			out += '<span class="old-price-num">'+arrayProduct[i].old_price+'</span>'
			out += '</span>';
		}
		out += '<span class="popular-product-price">';
		out += '<span class="popular-product-units">'+ arrayProduct[i].units +'</span>';
		out += '<span class="popular-product-num">'+ arrayProduct[i].price +'</span>';
		out += '</span>';
		out += '</span>';
		out += '<div class="addtoCartButton c-pointer" product-id="'+ arrayProduct[i].id +'">';
		out += '<i class="fas fa-shopping-basket"></i>';
		out += '</div>';
		out += '</div>';
		out += '</div>';
		out += '</div>';
	}
	$('.popular-product__holder').html(out);
	$('.product-top').css({
		height: $('.product-top').outerWidth(),
	});
	$('.addToLiked').on('click',addToLikedCart);
	$('.addtoCartButton').on('click',addToCart);
	textOverflow($('.popular-product-text'),60);
	initAllRatings();
	$('.watchAboutProduct').on('click',goToPreview);
}

function addToLikedCart(){
	let id = $(this).attr('product-id');
	let tooltip = $(this).find('.tooltipLike');
	if (likedProduct[id] != undefined) {
		delete likedProduct[id];
		$(this).removeClass('active');
	}else {
		errorLiked(tooltip);
		likedProduct[id] = 1;
		$(this).addClass('active');
	}
	outCountLikedProduct();
	saveLikedToLS();
	outCountLikedProduct();
}
function errorLiked(a){
	a.addClass('active');
	setTimeout(removeClass,2000)
	function removeClass(){
		a.removeClass('active');
	}
}
function addToCart(){
	let id = $(this).attr('product-id');
	if (cart[id] != undefined) {
		cart[id]++;
	}else {
		cart[id] = 1;
	}
	saveCartToLS();
	outCountCartProduct();
}
function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart) );
}
function saveLikedToLS(){
    localStorage.setItem('likedProduct', JSON.stringify(likedProduct) );
}

function goToPreview(){
	let url = $(this).attr('link');
	let id = $(this).attr('product-id');
    singleItemId['item'] = id;
    localStorage.setItem('singleItem', JSON.stringify(singleItemId));
    $('.preloader').addClass('active');
    setTimeout(function(){
    	document.location.href = url;
    },1000);
};


outCountCartProduct();
function outCountCartProduct(){
	let zero = 0;
	for(let i in cart){
		zero += +cart[i];
	}
	$('.cart-count').html(zero);
	$('.cart-total-count').html(zero);
}
outCountLikedProduct();
function outCountLikedProduct(){
	let zero = 0;
	for(let i in likedProduct){
		zero += +likedProduct[i];
	}
	$('.like-count-product').html(zero);
	$('.wishlist-count').html(zero);
}


findProduct();
async function findProduct(){
	let product = shopProduct.find(element => element.id === +singleItemId['item']);
	await outInformation(product);
	await plusProduct(product);
	await minusProduct(product);
}
async function outInformation(array){
	$('.product-info-img').attr('src', 'img/'+ array.image +'');
	$('.product-info-title').html(array.name);
	$('.right-info .rating__value').html(array.rating);
	$('.product-description').html(array.description);
	$('.product-units').html(array.units);
	$('.product-price-num').html(array.price);
	$('.add-to-cart').attr('product-id', array.id);
	$('.add-to-wishlist').attr('product-id', array.id);
	$('.minusProduct').attr('product-id', array.id);
	$('.plusProduct').attr('product-id', array.id);
	if(cart[array.id] != undefined){
		$('.product-cart-count').val(cart[array.id]);
		$('.alredyInCart').html('Уже есть в корзине');
	}
	if(likedProduct[array.id] != undefined){
		$('.add-to-wishlist').addClass('active');
	}
	$('.product-category').html(array.category_name);
	await initAllRatings();
	await $('.add-to-cart').on('click',addToPreviewCart);
	await $('.add-to-wishlist').on('click',addToLikedCart);
	findNextProduct();
	findPrevProduct();
}

// Плюсование продукта


function plusProduct(array){
	$('.plusProduct').on('click',function(){
		let inputNum = +$('.product-cart-count').val();
		let plusInput = inputNum++;
		let plusProduct = inputNum++;
		$('.product-cart-count').val(plusProduct);
		if(cart[array.id] != undefined){
			$('.alredyInCart').html('Обновить');
		}
	});

}

// Минусование продукта
function minusProduct(array){
	$('.minusProduct').on('click',function(){
		let inputNum = +$('.product-cart-count').val();
		let plusInput = inputNum--;
		let plusProduct = inputNum--;
		$('.product-cart-count').val(plusProduct);
		if($('.product-cart-count').val() <= 1){
			$('.product-cart-count').val(1);
		};
		if(cart[array.id] != undefined){
			$('.alredyInCart').html('Обновить');
		}
	});
};

function findNextProduct(){

	function findIndex(product) {
    	return product.id === +singleItemId['item'];
	}
	let indexCurrentProduct = shopProduct.findIndex(findIndex);
	let indexnextProduct = indexCurrentProduct + 1;
	let nextProduct;
	if(shopProduct[indexnextProduct] != undefined){
		nextProduct = shopProduct[indexnextProduct];
	}else {
		nextProduct = shopProduct[0];
	}
	$('.next-arrow').attr('product-id', nextProduct.id);
	$('.next-product-img').attr('src', 'img/'+ nextProduct.image +'');
	$('.next-product-name').html(nextProduct.name);
	$('.next-product-units').html(nextProduct.units);
	$('.next-product-price-num').html(nextProduct.price);
	$('.next-arrow').on('click',goToPreview);
}

function findPrevProduct(){

	function findIndex(product) {
    	return product.id === +singleItemId['item'];
	}
	let indexCurrentProduct = shopProduct.findIndex(findIndex);
	let indexPrevProduct = indexCurrentProduct - 1;
	let prevProduct;
	if(shopProduct[indexPrevProduct] != undefined) {
		prevProduct = shopProduct[indexPrevProduct];
	}else {
		prevProduct = shopProduct[shopProduct.length - 1];
	}
	$('.prev-arrow').attr('product-id', prevProduct.id);
	$('.prev-product-img').attr('src', 'img/'+ prevProduct.image +'');
	$('.prev-product-name').html(prevProduct.name);
	$('.prev-product-units').html(prevProduct.units);
	$('.prev-product-num').html(prevProduct.price);
	$('.prev-arrow').on('click',goToPreview);
}

function addToPreviewCart(){
	let id = $(this).attr('product-id');
	cart[id] = +$('.product-cart-count').val();
	saveCartToLS();
	outCountCartProduct();
	$('.alredyInCart').html('В корзине');
}



filterOutComments();
function filterOutComments(){
	let findIdProduct = productsCommentsInfo.filter(element => element.id === +singleItemId['item']);
	if(findIdProduct.length === 0){
		console.log(findIdProduct);
	}
	outComments(findIdProduct,$('.all-comments-product-holder'));
	$('.comments-count').html(findIdProduct.length);
}

function outComments(commentArray,commentsHolder){
	let out = '';
	for(let i = 0;i<commentArray.length;i++){
		out += '<div class="comments__item">';
		out += '<div class="comments__profile-holder">';
		out += '<img src="img/avatar-1.jpeg" alt="" class="comments-profile-img">';
		out += '</div>';
		out += '<div class="comments__right__holder">';
		out += '<div class="rating product-rating">';
		out += '<div class="rating__body">';
		out += '<div class="rating__active"></div>';
		out += '<div class="rating__items">';
		out += '<input type="radio" name="rating" value="1" class="rating__item">';
		out += '<input type="radio" name="rating" value="2" class="rating__item">';
		out += '<input type="radio" name="rating" value="3" class="rating__item">';
		out += '<input type="radio" name="rating" value="4" class="rating__item">';
		out += '<input type="radio" name="rating" value="5" class="rating__item">';
		out += '</div>';
		out += '</div>';
		out += '<div class="rating__value">'+ commentArray[i].rating +'</div>';
		out += '</div>';
		out += '<div class="comments-name-date-holder">';
		out += '<span class="comments-user-name">'+commentArray[i].user_name+'</span>';
		out += '<span class="comments-date d-flex">';
		out += '<span class="date-month">'+commentArray[i].date_month+'</span>/';
		out += '<span class="comments-date-day">'+commentArray[i].date_day+'</span>/';
		out += '<span class="comments-date-year">'+commentArray[i].date_year+'</span>';
		out += '</span>';
		out += '</div>';
		out += '<div class="comments-text-holder">';
		out += '<p class="comments-text">' + commentArray[i].comment_text + '</p>'
		out += '</div>';
		out += '</div>';
		out += '</div>';
	}
	commentsHolder.html(out);
	initAllRatings();
}

