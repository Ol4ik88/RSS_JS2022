"use strict";
const menuIcon=document.querySelector('.menu__icon');
const overlayAll=document.querySelectorAll('.overlay');
const logoBurger=document.querySelector('.header__logo-burger');
const menulist=document.querySelector('.menu__list');
const menuLinks=document.querySelectorAll('.menu__link');
const headerLogo=document.querySelector('.header__logo');

menuIcon.addEventListener("click", function(e){
	logoBurger.classList.toggle("active");
	menuIcon.classList.toggle("active");
	menulist.classList.toggle("active");
	document.body.classList.toggle('lock');
	overlayAll.forEach(overlay => {
		overlay.classList.toggle("active");
	});
});
//клик на пунктах меню
if(menuLinks.length>0){
	menuLinks.forEach(menuLink =>{
		menuLink.addEventListener('click',onMenuLinkClick);
	});
	function onMenuLinkClick() {
		if (menuIcon.classList.contains('active')){
			overlayAll.forEach(overlay => {
				overlay.classList.remove("active");
			});
			logoBurger.classList.remove("active");
			menuIcon.classList.remove("active");
			menulist.classList.remove("active");
			
			document.body.classList.remove('lock');
		}
	}
}
//клик по затемнению
overlayAll.forEach(overlay => {
	overlay.addEventListener("click", clickOverlay)
	
});
function clickOverlay(){
	overlayAll.forEach(overlay => {
		overlay.classList.remove("active");
	});
	logoBurger.classList.remove("active");
	menuIcon.classList.remove("active");
	menulist.classList.remove("active");
	document.body.classList.remove('lock');
	
}