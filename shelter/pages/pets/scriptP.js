"use strict";
import {pets} from '../../assets/dataPets/pets.js'

const menuIcon=document.querySelector('.menu__icon');
const overlayAll=document.querySelectorAll('.overlay');
const logoBurger=document.querySelector('.header__logo-burger');
const menulist=document.querySelector('.menu__list');
const menuLinks=document.querySelectorAll('.menu__link');
const OPEN_PAGINATION=document.querySelector('.our-friends__cards');
const CONTROL_START=document.querySelector('.control-start');
const CONTROL_PREV=document.querySelector('.control-prev');
const CURRENT_PAGE=document.querySelector('.current-page');
const CONTROL_NEXT=document.querySelector('.control-next');
const CONTROL_END=document.querySelector('.control-end');
const ARRAY_PETS=[];
let countPagesPagination;
let countPetsOnPages;
let currentPage=0;
let startPage=0;
let endPage;


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
	if(menuIcon.classList.contains('active')){
	overlayAll.forEach(overlay => {
		overlay.classList.remove("active");
	});
	logoBurger.classList.remove("active");
	menuIcon.classList.remove("active");
	menulist.classList.remove("active");
	document.body.classList.remove('lock');
	}
}

//random
function getRandomPagination(max) {
	let arrRandom=[];
	let number;
	//Array.prototype.push.apply(arrRandom,nextItemCards);
	while(arrRandom.length<max){
		number = Math.floor(Math.random() * 8);
		if (arrRandom.indexOf(number)==-1) 
			arrRandom.push(number);
	}
	return arrRandom;
}
const createCard = (numberPets)=>{
	const CARD = document.createElement('div');
	CARD.classList.add('card');
	const IMG = document.createElement('img');
	IMG.src=pets[numberPets].img;
	CARD.appendChild(IMG);
	const NAME_PETS = document.createElement('h4');
	NAME_PETS.classList.add('card__subheading');
	NAME_PETS.innerHTML=pets[numberPets].name;
	CARD.appendChild(NAME_PETS);
	const BUTTON_PETS = document.createElement('button');
	BUTTON_PETS.classList.add('button','card__button');
	BUTTON_PETS.innerHTML='Learn more';
	CARD.appendChild(BUTTON_PETS);
	return CARD;
}
//open page
function showPage(currentPage){
	OPEN_PAGINATION.innerHTML="";
	for (let i=0; i<countPetsOnPages; i++){
		const CURRENT_PAGE=createCard(ARRAY_PETS[currentPage][i]);
		OPEN_PAGINATION.appendChild(CURRENT_PAGE);
		}
}


//init array pets
function init(){
	if (window.innerWidth >= 1280) {
		countPagesPagination=6;
		countPetsOnPages=8;
		endPage=5;
	}
	else {
		if(window.innerWidth >=768) {
		countPagesPagination=8;
		countPetsOnPages=6;
		endPage=7;
		}
	else{
		countPagesPagination=16;
		countPetsOnPages=3;
		endPage=15;
		}
	}
	for (let i=0;i<countPagesPagination;i++){
	ARRAY_PETS.push(getRandomPagination(countPetsOnPages));
	}
console.log(ARRAY_PETS);

CURRENT_PAGE.innerHTML='1';
showPage(startPage);
}
init();


CONTROL_END.addEventListener('click', () => {
	showPage(endPage);
	CONTROL_NEXT.classList.toggle("disabled");
	CONTROL_END.classList.toggle("disabled");
	CONTROL_START.classList.remove("disabled");
	CONTROL_PREV.classList.remove("disabled");
	CURRENT_PAGE.innerHTML=endPage+1;
});
CONTROL_START.addEventListener('click', () => {
	showPage(startPage);
	CONTROL_NEXT.classList.remove("disabled");
	CONTROL_END.classList.remove("disabled");
	CONTROL_START.classList.toggle("disabled");
	CONTROL_PREV.classList.toggle("disabled");
	CURRENT_PAGE.innerHTML=startPage+1;
});
CONTROL_NEXT.addEventListener('click', () => {
	if (currentPage==(endPage-1)){
		CONTROL_NEXT.classList.toggle("disabled");
		CONTROL_END.classList.toggle("disabled");
	}
	else{
		CONTROL_NEXT.classList.remove("disabled");
		CONTROL_END.classList.remove("disabled");
		CONTROL_START.classList.remove("disabled");
		CONTROL_PREV.classList.remove("disabled");
		}
	currentPage++;
	showPage(currentPage);
	CURRENT_PAGE.innerHTML=currentPage+1;
});

CONTROL_PREV.addEventListener('click', () => {
	if (currentPage==(startPage+1)){
		CONTROL_START.classList.toggle("disabled");
		CONTROL_PREV.classList.toggle("disabled");
	}
	else{
		CONTROL_NEXT.classList.remove("disabled");
		CONTROL_END.classList.remove("disabled");
		CONTROL_START.classList.remove("disabled");
		CONTROL_PREV.classList.remove("disabled");
		}
	currentPage--;
	showPage(currentPage);
	CURRENT_PAGE.innerHTML=currentPage+1;
});


