"use strict";
import {pets} from '../../assets/dataPets/pets.js'

// burger-menu
const menuIcon=document.querySelector('.menu__icon');
const overlay=document.querySelector('.overlay');
const logoBurger=document.querySelector('.header__logo-burger');
const menulist=document.querySelector('.menu__list');
const menuLinks=document.querySelectorAll('.menu__link');

menuIcon.addEventListener("click", function(e){
	overlay.classList.toggle("active");
	logoBurger.classList.toggle("active");
	menuIcon.classList.toggle("active");
	menulist.classList.toggle("active");
	document.body.classList.toggle('lock');
});

if(menuLinks.length>0){
	menuLinks.forEach(menuLink =>{
		menuLink.addEventListener('click',onMenuLinkClick);
	});
	function onMenuLinkClick() {
		if (menuIcon.classList.contains('active')){
			overlay.classList.remove("active");
			logoBurger.classList.remove("active");
			menuIcon.classList.remove("active");
			menulist.classList.remove("active");
			document.body.classList.remove('lock');
		}
	}
}
overlay.addEventListener("click", function(e){
	overlay.classList.remove("active");
	logoBurger.classList.remove("active");
	menuIcon.classList.remove("active");
	menulist.classList.remove("active");
	document.body.classList.remove('lock');
});

let activeItemCards=[];
let nextItemCards=[];
let randomNumberForCards=[];
let countCards=6;
let coundCardsActive=3;
//random
function getRandomPrevCards(max) {
	let arrRandom=[];
	let number;
	Array.prototype.push.apply(arrRandom,nextItemCards);
	while(arrRandom.length<max){
		number = Math.floor(Math.random() * 8);
		if (arrRandom.indexOf(number)==-1) 
			arrRandom.push(number);
	}
	return arrRandom;
}
if(window.innerWidth >= 1280) {
	randomNumberForCards=getRandomPrevCards(countCards);
	activeItemCards=randomNumberForCards.slice(0,coundCardsActive);
	nextItemCards=randomNumberForCards.slice(coundCardsActive);
	}
else {
	if(window.innerWidth >=768) {
		countCards=4;
		coundCardsActive=2;
		randomNumberForCards=getRandomPrevCards(countCards);
		activeItemCards=randomNumberForCards.slice(0,coundCardsActive);
		nextItemCards=randomNumberForCards.slice(coundCardsActive);
		
	}
		else{
			countCards=2;
			coundCardsActive=1;
			randomNumberForCards=getRandomPrevCards(countCards);
			activeItemCards=randomNumberForCards.slice(0,coundCardsActive);
			nextItemCards=randomNumberForCards.slice(coundCardsActive);
			}
}
console.log("activeItemCards1", activeItemCards);
console.log("nextItemCards1", nextItemCards);
//slider
const BTN_LEFT=document.querySelector('.control_next');
const BTN_RIGHT=document.querySelector('.control_prev');
const CAROUSEL=document.querySelector('.carousel');
const ITEM_LEFT=document.querySelector('.item-left');
const ITEM_RIGHT=document.querySelector('.item-right');
const ITEM_ACTIVE=document.querySelector('.item-active');

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
//init slider
function init(){
	for (let i=0; i<coundCardsActive; i++){
		const CARD_LEFT = createCard(nextItemCards[i]);
		ITEM_LEFT.appendChild(CARD_LEFT);
		const CARD_ACTIVE = createCard(activeItemCards[i]);
		ITEM_ACTIVE.appendChild(CARD_ACTIVE);
		const CARD_RIGHT = createCard(nextItemCards[i]);
		ITEM_RIGHT.appendChild(CARD_RIGHT);
	}
}

init();
	const moveLeft = () => {
	CAROUSEL.classList.add('transition-left');
	BTN_LEFT.removeEventListener('click',moveLeft);
	BTN_RIGHT.removeEventListener('click',moveRight);
}
const moveRight = () => {
	CAROUSEL.classList.add('transition-right');
	BTN_LEFT.removeEventListener('click',moveLeft);
	BTN_RIGHT.removeEventListener('click',moveRight);
}

BTN_LEFT.addEventListener('click',moveLeft);
BTN_RIGHT.addEventListener('click',moveRight);

CAROUSEL.addEventListener('animationend', (animationEvent) => {
	let changedItem;
	randomNumberForCards=getRandomPrevCards(countCards);
	activeItemCards=randomNumberForCards.slice(0,coundCardsActive);
	nextItemCards=randomNumberForCards.slice(coundCardsActive);
	console.log("arrRandom", randomNumberForCards);
	console.log("activeItemCards", activeItemCards);
	console.log("nextItemCards", nextItemCards);
	if (animationEvent.animationName === 'move-left'){
		CAROUSEL.classList.remove('transition-left');
		changedItem=ITEM_LEFT;
	} else {
		CAROUSEL.classList.remove('transition-right');
		changedItem=ITEM_RIGHT;
	}
	ITEM_ACTIVE.innerHTML=changedItem.innerHTML;
	ITEM_RIGHT.innerHTML="";
	ITEM_LEFT.innerHTML="";
	
	for (let i=0; i<coundCardsActive; i++){
		const CARD_LEFT= createCard(nextItemCards[i]);
		ITEM_RIGHT.appendChild(CARD_LEFT);
		const CARD_RIGHT= createCard(nextItemCards[i]);
		ITEM_LEFT.appendChild(CARD_RIGHT);
	}
	BTN_LEFT.addEventListener('click',moveLeft);
	BTN_RIGHT.addEventListener('click',moveRight);
	
})

