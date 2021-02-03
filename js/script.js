// Стилизация
$('.services .right').css({
	width: $('.services .services-circle').outerWidth(),
	height: $('.services .services-circle').outerHeight(),
});
let cloudWidthResult = $('.cloud').outerWidth() / 100;
let resultWidthCloudImg = cloudWidthResult * 10;
let cloudHeightResult = $('.cloud').outerHeight() / 100;
let resultHeightCloudImg = cloudHeightResult * 18;
$('.cloud-parallax').css({
	width: $('.cloud').outerWidth() - resultWidthCloudImg,
	height: $('.cloud').outerHeight() - resultHeightCloudImg,
});
// Параллакс эффект
$('.banner').on('mousemove',function(e){
	let width = $(this).outerWidth() / 2;
	let height = $(this).outerHeight() / 2;
	var e1 = e.pageX - $(this).offset().left;
	var x = e.pageY - $(this).offset().top;
	let a1 = (e1 - width) / 30;
	let a2 = (x - height) / 30;
	let c1 = (e1 - width) / 30;
	let b1 = $('.banner .tomato').outerHeight() / 4;
	let b2 = $('.banner .tomato').outerWidth() / 1.2;
	$('.banner .tomato').css({
		transform: 'translate(' + -(a1 + b2) + 'px,' + -(a2 + b1) + 'px)' ,
	});
	$('.banner .shape').css({
		transform: 'rotateY(' + c1 + 'deg)' 
	});
});
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

let cart = {};
let likedProduct = {};
// Проверка LocalStorage
function checkCart(){
	let result = localStorage.getItem('cart');
	if (result != null) {
		cart = JSON.parse(result);
	}
}

function checkLikeProduct(){
	let result = localStorage.getItem('likedProduct');
	if (result != null) {
		likedProduct = JSON.parse(result);
	}
}
checkLikeProduct();
checkCart();
filterOutProduct(1);
function filterOutProduct(categoryOfProduct){
	let filter = shopProduct.filter(element => element.category === categoryOfProduct);
	outProduct(filter);
}
// Вывод продуктов
function outProduct(arrayProduct){
	let out = '';
	for(let i = 0;i<arrayProduct.length;i++){
		out += '<div class="product-item">';
		out += '<div class="product-top">';
		out += '<div class="product-effect"></div>';
		if(likedProduct[arrayProduct[i].id] != undefined){
			out += '<i class="fas fa-heart addToLiked c-pointer active" product-id="'+ arrayProduct[i].id +'"><div class="tooltipLike">Уже есть в Избранных</div></i>';
		}else {
			out += '<i class="fas fa-heart addToLiked c-pointer" product-id="'+ arrayProduct[i].id +'"><div class="tooltipLike">Уже есть в Избранных</div></i>';
		}
		out += '<img src="img/'+arrayProduct[i].image+'" alt="" class="product-item-img">';
		out += '</div>';
		out += '<div class="product-info">';
		out += '<div class="rating popular-product-rating">';
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
		out += '<span class="popular-product-title">'+ arrayProduct[i].name +'</span>';
		out += '<p class="popular-product-text">'+arrayProduct[i].description+'</p>';
		out += '<div class="product-bottom-holder">'
		out += '<span class="popular-product-price">';
		out += '<span class="popular-product-units">'+ arrayProduct[i].units +'</span>';
		out += '<span class="popular-product-num">'+ arrayProduct[i].price +'</span>';
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
}
function addToLikedCart(){
	let id = $(this).attr('product-id');
	let tooltip = $(this).find('.tooltipLike');
	if (likedProduct[id] != undefined) {
		errorLiked(tooltip);
	}else {
		likedProduct[id] = 1;
		$(this).addClass('active');
	}
	saveLikedToLS();
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
}
$('.tab-item').on('click',changeOutProducts);
function changeOutProducts(){
	$('.tab-item').each(function() {
		$(this).removeClass('active');  		
	});
	$(this).addClass('active');
	let idProduct = +$(this).attr('product-id');
	filterOutProduct(idProduct);
	textOverflow($('.popular-product-text'),60);
	initAllRatings();
}
filterRecipeProducts();
function filterRecipeProducts(){
	let number = 0;
	for(let i in shopProduct){
		number += shopProduct[i].rating;
	}
	let RatioRating = number / shopProduct.length
	let filter = shopProduct.filter(element => element.rating >= RatioRating);
	const rand = Math.floor(Math.random() * 9) + 1;
	let math = Math.floor(Math.random() * (filter.length + 1));
	let sort = filter.sort((a, b) => a.rating - b.rating);
	var sortedProduct = sort.slice(-6);
	outProductRecipe(sortedProduct);
}
function outProductRecipe(filterArrayProduct){
	let out = '';
	for(let i = 0;i<filterArrayProduct.length;i++){
		out += '<div class="product-recipe-item">';
		out += '<div class="recipe-item">';
		out += '<div class="filter-product-img-holder">';
		out += '<img src="img/'+filterArrayProduct[i].image+'" alt="" class="filter-product-img">';
		out += '</div>';
		out += '<div class="filter-recipe-info-text">';
		out += '<span class="filter-product-title">'+filterArrayProduct[i].name+'</span>';
		out += '<span class="filter-product-tag">'+filterArrayProduct[i].name +'</span>';
		out += '<span class="filter-product-price">';
		out += '<span class="filter-product-units">'+ filterArrayProduct[i].units +'</span>';
		out += '<span class="filter-product-num">'+ filterArrayProduct[i].price +'</span>';
		out += '</span>';
		out += '</div>';
		out += '<div class="filterAddtoCartButton" product-id="'+ filterArrayProduct[i].id +'"><i class="fas fa-shopping-basket"></i></div>';
		out += '</div></div>';			
	}
	$('.product-recipe-holder').html(out);
	$('.filterAddtoCartButton').on('click',addToCart);
}

// Сохранение в LocalStorage
function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart) );
}
function saveLikedToLS(){
    localStorage.setItem('likedProduct', JSON.stringify(likedProduct) );
}
$('.comments-holder').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	infinite:true,
	autoplay:true,
	autoplayspeed:4000,
	arrows:false,
	dots:true,
});
filterBlogPosts();
function filterBlogPosts(){
	outBlogPost(blogPosts,$('.blog-holder'));
}
function outBlogPost(blogPostArray,blogPostsHolder){
	let out = '';
	for(let i = 0;i<blogPostArray.length;i++){
		out += '<div class="blog-item">';
		out += '<div class="blog-img-holder">';
		out += '<img src="img/' + blogPostArray[i].image + '" alt="" class="blog-img">';
		out += '</div>';
		out += '<div class="blog-info-holder">';
		out += '<div class="blog-info-top-holder">';
		out += '<div class="blog-info-top">';
		out += '<span class="blog-category blog-info-title">'+ blogPostArray[i].category +'</span>';
		out += '<span class="blog-date blog-info-title">'+ blogPostArray[i].date +'</span>';		
		out += '<span class="blog-user blog-info-title">Post By <span class="blog-user-name">'+ blogPostArray[i].author +'</span></span>';
		out += '</div>';
		out += '<span class="blog-item-title">'+ blogPostArray[i].title +'</span>';		
		out += '<p class="blog-text">'+ blogPostArray[i].text +'</p>';
		out += '</div>';
		out += '<a href="#" class="blog-button">Read More</a>';
		out += '</div>';
		out += '</div>';
	}
	blogPostsHolder.html(out);
	textOverflow($('.blog-text'),132);
}
var text = 'Hello people of 1974. I come from the future. In 2014 we have laser guns, hover boards and live on the moon!';

// Найдет годы. \d+ найдет один и более знаков

var yearRegex = /\d+/g;

console.log('Years: ', text.match( yearRegex ) );