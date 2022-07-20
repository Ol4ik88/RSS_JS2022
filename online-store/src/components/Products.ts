import dataJSON from './data.json';
import Card from './Card';
import { IProduct } from '../type/type';
import { sortByValue } from './sorting';
import { filter} from './storage';
import { car } from './Car';


export class Products {
  catalog: IProduct[];
  curProductsOnPage:IProduct[];
  constructor(){
    [...this.catalog]=[...dataJSON];
    this.curProductsOnPage=[];
  }
  
  filterProducts(data:IProduct[], productOfCar:Set<string>) {
    this.curProductsOnPage=[];
    this.curProductsOnPage = data.filter((elem: IProduct) =>{
      return (elem.price>=filter.minPrice && elem.price<=filter.maxPrice 
        && elem.amount>=filter.minAmount&& elem.amount<=filter.maxAmount)
    });
    if (filter.category.size) {
      this.curProductsOnPage = this.curProductsOnPage.filter((elem: IProduct)=>
        filter.category.has(elem.category)
      );
    }
    if(filter.brand.size) {
      this.curProductsOnPage = this.curProductsOnPage.filter((elem: IProduct)=>
      filter.brand.has(elem.brand)
      );
    }
    if(filter.age.size) {
      this.curProductsOnPage = this.curProductsOnPage.filter((elem: IProduct)=>
      filter.age.has(elem.age)
      );
    }
    if(filter.onlySale) {
      this.curProductsOnPage = this.curProductsOnPage.filter((elem: IProduct)=>
        filter.onlySale == elem.sale
      );
    }
    this.renderCards(this.curProductsOnPage);
    car.updateCard(productOfCar);
  }

  renderCards(data:IProduct[]){
    const listing=document.querySelector('.listing') as HTMLDivElement;
    listing.innerHTML="";
    if(!data.length) {
      listing.innerHTML=`<span class="no-results">Sorry, no results were found for your search</span>`;
    } else {
      data.forEach((elem: IProduct) =>{
        let {id, category, name, brand, amount, img, price, sale, age} = elem;
        const card= new Card(id, category, name, brand, amount, img, price, sale, age);
        listing.appendChild(card.createCard());
      });
    }
  }
  
  sortingCard(value:string){
    this.catalog=sortByValue(value,this.catalog);
    this.filterProducts(this.catalog, car.productOfCar);
  }

}
