import { cards } from '..';
import { IFilter, IProduct, valueBrand, valueCategory, valueAge } from '../type/type';
import { car } from './Car';

export let filter: IFilter = {
  minPrice: 10,
  maxPrice: 50,
  minAmount: 1,
  maxAmount: 20,
  brand: new Set(),
  category: new Set(),
  age: new Set(),
  onlySale: false
}

export const addCardClickHandler = () => {
  let listing = document.querySelector('.listing');
	if (listing) {
    listing.addEventListener('click', (e) => {
      if((e.target as HTMLElement).closest('.card')){
        let clickedCardId:string=(e.target as HTMLElement)
          .closest('.card')?.getAttribute('data-id') as string;
        car.add(clickedCardId);
        car.renderCar();
      }
		});
  }
}

export const addSearchClickHandler = () => {
  let inputSearch = document.querySelector('.search');
  inputSearch?.addEventListener('keyup',(e)=>{
    cards.filterProducts(filterSearch((e.target as HTMLInputElement).value, cards.catalog), car.productOfCar);
  });
  inputSearch?.addEventListener('search', ()=>{
    cards.filterProducts(cards.catalog, car.productOfCar);
  });
}

function filterSearch(val:string, list:IProduct[]) {
  return list.filter(elem => (~elem.name.toLowerCase().indexOf(val.toLowerCase())));
}

export const addBrandClickHandler = () => {
  let brand = document.querySelector('.list-brand');
	if (brand){
    brand.addEventListener('click', (e)=>{
      let clickedButton = (e.target as HTMLElement).closest('.button');
      if(clickedButton){
        filterToValue(clickedButton, valueBrand, filter.brand);
      } 
        cards.filterProducts(cards.catalog, car.productOfCar);
    });
  }
}
function filterToValue(element:Element, valueBtn:Record<string,string>, filterSet:Set<string>) {
  for(let key in valueBtn){
    if(element.classList.contains(key)) {
        isHasClass(valueBtn[key], filterSet); 
    }
  }
  element.classList.toggle('active');
}

function isHasClass(nameClass:string, filterSet:Set<string>){
  if(filterSet.has(nameClass)){
    filterSet.delete(nameClass);
  } else {
    filterSet.add(nameClass);
  }
}

export const addCategoryClickHandler = () => {
  let category = document.querySelector('.list-catigory');
	if (category){
    category.addEventListener('click', (e)=>{
      let clickedButton = (e.target as HTMLElement).closest('.button');
      if(clickedButton){
        filterToValue(clickedButton, valueCategory, filter.category);
      } 
        cards.filterProducts(cards.catalog, car.productOfCar);
    });
  }
}

export const addAgeClickHandler = () => {
  let age = document.querySelector('.list-age');
	if (age){
    age.addEventListener('click', (e)=>{
      let clickedButton = (e.target as HTMLElement).closest('.button');
      if(clickedButton){
        filterToValue(clickedButton, valueAge, filter.age);
      } 
        cards.filterProducts(cards.catalog, /* filter,  */car.productOfCar);
    });
  }
}

export const addSaleClickHandler = () => {
  let age = document.querySelector('.sale-input');
	if (age){
    age.addEventListener('click', (e)=>{
      let clickedButton = e.target as Element;
      if(clickedButton) {
        filter.onlySale = !filter.onlySale;
      } 
        cards.filterProducts(cards.catalog, car.productOfCar);
    });
  }
}

export const addResetSettingClickHandler = ()=>{
  let resetSettings = document.querySelector('.reset-settings') as HTMLSelectElement;
  resetSettings.addEventListener('click', function(){
    window.location.reload(); 
  });
}