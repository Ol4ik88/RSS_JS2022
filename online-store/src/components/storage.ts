import { IFilter } from "../type/type";
import { car } from "./Car";

export let filter: IFilter ;

export function removeStorage(name:string) {
  localStorage.removeItem(name);
}
export function setLocalStorage(){
  let select = document.querySelector('.sort') as HTMLSelectElement; 
  let inputSearch = document.querySelector('.search') as HTMLInputElement;
  localStorage.setItem('sort', JSON.stringify(select.value));
  localStorage.setItem('search', JSON.stringify(inputSearch.value));

  localStorage.setItem('filter', JSON.stringify(filter));
  localStorage.setItem('brand', JSON.stringify([...filter.brand]));
  localStorage.setItem('category', JSON.stringify([...filter.category]));
  localStorage.setItem('age', JSON.stringify([...filter.age]));
  
  localStorage.setItem('car', JSON.stringify([... car.productOfCar]));
}

export function getLocalStorage(){
  let filters = JSON.parse(localStorage.getItem('filter') as string);
  let sort = JSON.parse(localStorage.getItem('sort') as string) as string;
  let inputSearch = JSON.parse(localStorage.getItem('search') as string) as string;
  car.productOfCar = new Set(JSON.parse(localStorage.getItem('car')as string)) || new Set(),
  filter = {
    "minPrice": filters?.minPrice || 5,
    "maxPrice": filters?.maxPrice || 50,
    "minAmount": filters?.minAmount || 1,
    "maxAmount": filters?.maxAmount || 20,
    "brand": new Set(JSON.parse(localStorage.getItem('brand') as string))||new Set(),
    "category": new Set(JSON.parse(localStorage.getItem('category')as string)) || new Set(),
    "age": new Set(JSON.parse(localStorage.getItem('age')as string)) || new Set(),
    "onlySale": filters?.onlySale || false,
    "sort": sort || "nameAZ",
    "inputSearch": inputSearch || ""
  }
}
