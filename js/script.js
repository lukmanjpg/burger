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
		out += '<i class="fas fa-heart addToLiked" product-id="'+ arrayProduct[i].id +'"></i>';		
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
		out += '<div class="addtoCartButton">';
		out += '<i class="fas fa-shopping-basket" product-id="'+ arrayProduct[i].id +'"></i>';
		out += '</div>';
		out += '</div>';
		out += '</div>';
		out += '</div>';
	}
	$('.popular-product__holder').html(out);
	$('.product-top').css({
		height: $('.product-top').outerWidth(),
	});
	textOverflow($('.popular-product-text'),60);
	initAllRatings();
}

$('.tab-item').on('click',changeOutProducts);
function changeOutProducts(){
	$('.tab-item').each(function() {
		$(this).removeClass('active');  		
	});
	$(this).addClass('active');
	let idProduct = +$(this).attr('product-id');
	filterOutProduct(idProduct);
	textOverflow();
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
	var citrus = sort.slice(-6);
	console.log(citrus)
	outProductRecipe(citrus);
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
		out += '<div class="filterAddtoCartButton"><i class="fas fa-shopping-basket"></i></div>';
		out += '</div></div>';			
	}
	$('.product-recipe-holder').html(out);
}

let findOverflowText = $('.comments-text').find('.afterLength');
findOverflowText.on('click',function(){
	
})