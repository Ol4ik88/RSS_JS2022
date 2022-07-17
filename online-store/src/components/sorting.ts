import { cards } from "..";
import { IProduct} from "../type/type";

export function sortByValue(val:string, data:IProduct[]): IProduct[] {
  let result;
  switch(val) {
    case 'nameAZ':  
      result = data.sort((a:IProduct,b:IProduct) => {
        return a.name > b.name ? 1 : -1;
      });
    break;
    case 'nameZA': 
      result = data.sort((a:IProduct,b:IProduct) => {
        return a.name < b.name ? 1 : -1;
      });
    break;
    case 'priceAZ': 
      result = data.sort((a:IProduct,b:IProduct) => {
        return a.price > b.price ? 1 : -1;
      });
    break;
    case 'priceZA': 
      result = data.sort((a:IProduct,b:IProduct) => {
        return a.price < b.price ? 1 : -1;
      });
    break;
    default: result =data;
  }
  return result;
}

export const addSortClickHandler = ()=>{
  let select = document.querySelector('.sort') as HTMLSelectElement;
  select.addEventListener('change', function(){
    cards.sortingCard(this.value)});
}