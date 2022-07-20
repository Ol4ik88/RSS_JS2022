import { cards } from '..';
import { IProduct, valueBrand, valueCategory, valueAge} from '../type/type';
import { car } from './Car';
import { filter } from './storage';
import * as noUiSlider from 'nouislider';
import { resrtSortFilter } from './sorting';

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

export const initSearchFilter = (val: string) => {
  let inputSearch = document.querySelector('.search') as HTMLInputElement;
  inputSearch.value = val;
  cards.filterProducts(filterSearch(val, cards.catalog), car.productOfCar);
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
        cards.filterProducts(cards.catalog, car.productOfCar);
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

export const addResetSettingClickHandler = () => {
  let resetSettings = document.querySelector('.reset-settings') as HTMLSelectElement;
  let inputSearch = document.querySelector('.search') as HTMLInputElement;
  resetSettings.addEventListener('click', ()=>{
    localStorage.clear();
  });
  resetSettings.addEventListener('click', clearFilters);
  resetSettings.addEventListener('click', () => {
    car.clearCar();
    inputSearch.value = "";
    resrtSortFilter();
  });
}

export const addClickFilterReset=() => {
  let resetFilters = document.querySelector('.reset-filters') as HTMLSelectElement;
  resetFilters.addEventListener('click', clearFilters);
}

function clearFilters() {
  const rangeAmount = document.getElementById('range-amount') as noUiSlider.target;
  const rangePrice = document.getElementById('range-price') as noUiSlider.target;
  rangeAmount.noUiSlider?.set([1,20]);
  rangePrice.noUiSlider?.set([5,50]);
  filter.brand.clear();
  filter.category.clear();
  filter.age.clear();
  filter.onlySale = false;
  cards.filterProducts(cards.catalog, car.productOfCar);
  const btn = document.querySelectorAll('ul.list button');
  btn.forEach(e => {
    e?.classList.remove('active');
  })
  const btnSale = document.querySelector('.sale-input') as HTMLInputElement;
  btnSale.checked = false;
}

const initBtnFilter = (setFilter: Set<string>, btns:NodeListOf<Element>, 
    valueBtn:Record<string,string>) => {
  let classBtn = new Set<string>();
  for(let key in valueBtn) {
    if (setFilter.has(valueBtn[key])) {
      classBtn.add(key);
    }
  }
  if (classBtn.size) {
    classBtn.forEach(item => {
      btns.forEach(e => {
      if (e.classList.contains(item)) {
            e.classList.add('active');
          }
      }); 
    });
  }
}

export const initFiltersValue = () => {
  const btnBrand = document.querySelectorAll('ul.list-brand button');
  if(btnBrand) {
    initBtnFilter(filter.brand, btnBrand, valueBrand);
  }
  const btnCategory = document.querySelectorAll('ul.list-catigory button');
  if(btnCategory) {
    initBtnFilter(filter.category, btnCategory, valueCategory);
  }
  const btnAge = document.querySelectorAll('ul.list-age button');
  if(btnAge) {
    initBtnFilter(filter.age, btnAge, valueAge);
  }
  const btnSale = document.querySelector('.sale-input') as HTMLInputElement;
  btnSale.checked = filter.onlySale;
}