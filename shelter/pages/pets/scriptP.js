"use strict";
import {pets} from '../../assets/dataPets/pets.js'
import {Modal} from '../../assets/Modal.js';

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
	CARD.setAttribute('data-id',numberPets);
	const IMG = document.createElement('img');
	IMG.setAttribute('alt','pets');
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

//MODAL CONTENT
const createContentModal = (numberPets) =>{
	const MODAL_CONTENT=document.createElement('div');
	MODAL_CONTENT.classList.add('modal_content');

	const MODAL_CONTENT_IMG=document.createElement('div');
	MODAL_CONTENT_IMG.classList.add('modal_content-img');
	MODAL_CONTENT.appendChild(MODAL_CONTENT_IMG);

	const IMG = document.createElement('img');
	IMG.src=pets[numberPets].img;
	IMG.setAttribute('alt','pets');
	MODAL_CONTENT_IMG.appendChild(IMG);

	const MODAL_CONTENT_TEXT=document.createElement('div');
	MODAL_CONTENT_TEXT.classList.add('modal_content-text');

	const NAME_PETS = document.createElement('h3');
	
	NAME_PETS.innerHTML=pets[numberPets].name;
	MODAL_CONTENT_TEXT.appendChild(NAME_PETS);

	const TYPE_PETS = document.createElement('h4');
	
	TYPE_PETS.innerHTML=`${pets[numberPets].type} - ${pets[numberPets].breed}`;
	MODAL_CONTENT_TEXT.appendChild(TYPE_PETS);

	const DESCRIPTION = document.createElement('h5');
	DESCRIPTION.classList.add('description');
	DESCRIPTION.innerHTML=pets[numberPets].description;
	MODAL_CONTENT_TEXT.appendChild(DESCRIPTION);

	const LIST = document.createElement('ul');
	LIST.classList.add('modal__list');
	LIST.innerHTML=`<li><span><b>Age: </b>${pets[numberPets].age}</span></li>
	<li><span><b>Inoculations: </b>${pets[numberPets].inoculations}</span></li>
	<li><span><b>Diseases: </b>${pets[numberPets].diseases}</span></li>
	<li><span><b>Parasites: </b>${pets[numberPets].parasites}</span></li>`;
	MODAL_CONTENT_TEXT.appendChild(LIST);

	MODAL_CONTENT.appendChild(MODAL_CONTENT_TEXT);

	return MODAL_CONTENT;
}

const addCardClickHandler = ()=>{
	document.querySelector('.our-friends__cards').addEventListener('click', (e)=>{
		if(e.target.closest('.card')){
			let clickedCardId=e.target.closest('.card').getAttribute('data-id');
			console.log(clickedCardId);
			document.body.classList.toggle('lock');
			let card=createContentModal(clickedCardId);
			renderModalWindow(card);
		}
		
	})
}
const renderModalWindow=(content)=>{
	let modal = new Modal('modal');
	modal.buildModal(content);
}
///test
window.onload=function(){
	addCardClickHandler();
} 