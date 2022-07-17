import { Products } from './components/Products';
import { car } from './components/Car';
import { addClickFilterReset, initSliders } from './components/slider';
import './global.css';
import { addBrandClickHandler, addSearchClickHandler, addCardClickHandler, addResetSettingClickHandler, addCategoryClickHandler, addAgeClickHandler, addSaleClickHandler} from './components/filter';
import { addSortClickHandler} from './components/sorting';

car.renderCar();
export const cards = new Products();
cards.filterProducts(cards.catalog, car.productOfCar);
initSliders();

window.onload=function(){
  addCardClickHandler();
  addSortClickHandler();
  addSearchClickHandler();
  addBrandClickHandler();
  addCategoryClickHandler();
  addAgeClickHandler();
  addSaleClickHandler();
  addClickFilterReset();
  addResetSettingClickHandler();
}







