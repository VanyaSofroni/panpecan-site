var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

var productBtn = document.querySelectorAll('.product__btn');
var productPopupContent = document.querySelectorAll('.product-popup-content');
var productPopupContentClose = document.querySelectorAll('.product-popup-content__close');

var blockFeedbackBtn = document.querySelectorAll('.block-feedback__btn');
var popupCallback = document.querySelector('.popup-callback');
var popupCallbackClose = document.querySelector('.popup-callback__close');
var popupOverlay = document.querySelector('.popup-overlay');

var productHiddenGallery = document.querySelectorAll('.product__item .hidden a');

var popupCallbackThank = document.querySelector('.popup-callback-thank');
var popupCallbackThankClose = document.querySelector('.popup-callback-thank__close');
var popupCallbackThankBtn = document.querySelector('.popup-callback-thank__btn');

var productPopupContentThank = document.querySelector('.product-popup-content-thank');
var productPopupContentThankClose = document.querySelector('.product-popup-content-thank__close');
var productPopupContentThankBtn = document.querySelector('.product-popup-content-thank__btn');

					// -----Открытие-закрытие меню-----
navToggle.addEventListener('click', function () {
	if (navMain.classList.contains('main-nav--closed')) {
		navMain.classList.remove('main-nav--closed');
		navMain.classList.add('main-nav--opened');
	} else {
		navMain.classList.add('main-nav--closed');
		navMain.classList.remove('main-nav--opened');
	}
});

					// -----Открытие-закрытие модального окна в галереи товаров-----
for (var j = 0; j < productBtn.length; j++) {
	productBtn[j].addEventListener('click', function(event) {
		event.preventDefault();
		var block = this.parentNode.parentNode.parentNode.querySelector('.product-popup-content');
		block.classList.add('product-popup-content--show');	
		popupOverlay.classList.add('popup-overlay--show');	
	});
};

for (var k = 0; k < productPopupContentClose.length; k++) {
	productPopupContentClose[k].addEventListener('click', function(event) {
  	event.preventDefault();
  	var parent = this.parentNode.parentNode;
  	parent.classList.remove('product-popup-content--show');
  	popupOverlay.classList.remove('popup-overlay--show');
  });
};

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		for (var x = 0; x < productPopupContentClose.length; x++) {
			if (productPopupContent[x].classList.contains('product-popup-content--show')) {
				productPopupContent[x].classList.remove('product-popup-content--show');
				popupOverlay.classList.remove('popup-overlay--show');
			}
		}
	}
});

					// ----- Меняем класс, если пустая ссылка, что бы fancybox не применялся к пустым полям -----
for (var y = 0; y < productHiddenGallery.length; y++) {
	var item = productHiddenGallery[y].getAttribute('href');

	if (item == '') {
		productHiddenGallery[y].setAttribute('class', 'fff');
	}
};

					// -----Открытие-закрытие модального окна обратной связи в шапке и подвале сайта-----
for (var i = 0; i < blockFeedbackBtn.length; ++i) blockFeedbackBtn[i].addEventListener('click', function(event) {
	event.preventDefault();
	popupCallback.classList.add('popup-callback--show');
	popupOverlay.classList.add('popup-overlay--show');
	navMain.classList.add('main-nav--closed');
	navMain.classList.remove('main-nav--opened');
});

popupCallbackClose.addEventListener('click', function(event) {
	event.preventDefault();
	popupCallback.classList.remove('popup-callback--show');
	popupOverlay.classList.remove('popup-overlay--show');
});

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (popupCallback.classList.contains('popup-callback--show')) {
			popupCallback.classList.remove('popup-callback--show');
			popupOverlay.classList.remove('popup-overlay--show');
		}
	}
});

					// ----- Закрытие модального окна "Спасибо" по кнопке 'ОК', кнопке крестик(закрыть) и по клавише Esc -----
popupCallbackThankBtn.addEventListener('click', function (event) {
	event.preventDefault();
	popupCallbackThank.classList.remove('popup-callback-thank--show');
	popupOverlay.classList.remove('popup-overlay--show');
});

popupCallbackThankClose.addEventListener('click', function (event) {
	event.preventDefault();
	popupCallbackThank.classList.remove('popup-callback-thank--show');
	popupOverlay.classList.remove('popup-overlay--show');
});

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (popupCallbackThank.classList.contains('popup-callback-thank--show')) {
			popupCallbackThank.classList.remove('popup-callback-thank--show');
			popupOverlay.classList.remove('popup-overlay--show');
		}
	}
});

					// ----- Закрытие модального окна "Спасибо" в секции products по кнопке 'ОК', кнопке крестик(закрыть) и по клавише Esc -----
productPopupContentThankBtn.addEventListener('click', function (event) {
	event.preventDefault();
	productPopupContentThank.classList.remove('product-popup-content-thank--show');
	popupOverlay.classList.remove('popup-overlay--show');
});

productPopupContentThankClose.addEventListener('click', function (event) {
	event.preventDefault();
	productPopupContentThank.classList.remove('product-popup-content-thank--show');
	popupOverlay.classList.remove('popup-overlay--show');
});

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (productPopupContentThank.classList.contains('product-popup-content-thank--show')) {
			productPopupContentThank.classList.remove('product-popup-content-thank--show');
			popupOverlay.classList.remove('popup-overlay--show');
		}
	}
});

					// -----Слайдер-----
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
};

function currentSlide(n) {
	showSlides(slideIndex = n);
};

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName('slider__item');

	if(n > slides.length){
		slideIndex = 1;
	}

	if(n < 1) {
		slideIndex = slides.length;
	}

	for(i = 0; i < slides.length; i++){
		slides[i].style.display = "none";
	}

	slides[slideIndex - 1].style.display = "block";
};

					// Таймер автоматической перемотки слайдов
function slideTime(n) {
	n = 1
	showSlides(slideIndex += n);
}
var intervalID = setInterval(slideTime, 3000);﻿

				// Отмена таймера при событии наведения мыши на стрелки управления слайдером
var sliderArrow = document.querySelectorAll('.slider__arrow');

for (i = 0; i < sliderArrow.length; ++i) {
	sliderArrow[i].onmouseover = outInterval;
	sliderArrow[i].onmouseout = onInterval;
};

function outInterval() {
	clearInterval(intervalID);
	// console.log('outInterval');
}

function onInterval() {
	intervalID = setInterval(slideTime, 3000);﻿
	// console.log('onInterval');
}

					//-----Плавный скролл по странице-----
$(document).ready(function() {
	$('#menu').on('click','a', function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор блока с атрибута href
		var id = $(this).attr('href');

		//узнаем высоту от начала страницы до блока на который ссылается якорь
		var top = $(id).offset().top;

		//анимируем переход на расстояние - top за 800 мс
		$('body,html').animate({scrollTop: top - 15}, 800, 'linear');

		$(".main-nav").addClass('main-nav--closed');
		$(".main-nav").removeClass('main-nav--opened');
	});

	$('.page-header__logo').on('click', function (event) {
		event.preventDefault();
		var id = $(this).attr('href');
		var top = $(id).offset().top;
		$('body,html').animate({scrollTop: top - 15}, 800, 'linear');
	});

	$('.fancybox')
		.fancybox({
				padding : 0
		});


					// Form callback in header and footer
	$('.form-callback').submit(function() {
		var th = $(this);
		jQuery.ajax({
			type: 'POST',
			url: 'http://site.ru/wp-content/themes/site/mail.php', //change
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
				th.find('input').val('');
				th.trigger('reset');

				$('.popup-callback').removeClass('popup-callback--show');

				$('.popup-callback-thank').addClass('popup-callback-thank--show');
			}, 500);
		});
		return false;
	});


				// Form in section - order 
	$('#form-order').submit(function() {
		var th = $(this);
		jQuery.ajax({
			type: 'POST',
			url: 'http://site.ru/wp-content/themes/site/mail.php', //change
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
				th.find('input').val('');
				th.trigger('reset');
				
				$('.popup-overlay').addClass('popup-overlay--show');
				$('.product-popup-content-thank').addClass('product-popup-content-thank--show');
			}, 1000);
		});	
		return false;
	});	


					// Form in section - product
	$('.form-product').submit(function() {
		var th = $(this);
		jQuery.ajax({
			type: 'POST',
			url: 'http://site.ru/wp-content/themes/site/mail.php', //change
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
				th.find('input').val('');
				th.trigger('reset');

				$('.product-popup-content').removeClass('product-popup-content--show');
				
				$('.product-popup-content-thank').addClass('product-popup-content-thank--show');
			}, 500);
		});
		return false;
	});
});