"use strict";
const menuIcon=document.querySelector('.menu__icon');
const overlay=document.querySelector('.overlay');
const logoBurger=document.querySelector('.header__logo-burger');
const menulist=document.querySelector('.menu__list');


menuIcon.addEventListener("click", function(e){
	overlay.classList.toggle("active");
	logoBurger.classList.toggle("active");
	menuIcon.classList.toggle("active");
	menulist.classList.toggle("active");
	document.body.classList.toggle('lock');
	
});
overlay.addEventListener("click", function(e){
	overlay.classList.remove("active");
	logoBurger.classList.remove("active");
	menuIcon.classList.remove("active");
	menulist.classList.remove("active");
	document.body.classList.remove('lock');

});