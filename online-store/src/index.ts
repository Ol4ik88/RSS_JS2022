import { Products } from './components/Products';
import { car } from './components/Car';
import * as slider from './components/slider';
import './global.css';
import * as filters from './components/filter';
import * as sort from './components/sorting';
import { filter, getLocalStorage, setLocalStorage } from './components/storage';

window.addEventListener('load', getLocalStorage);
export const cards = new Products();

window.onload=function(){
  slider.initSliders();
  sort.initSortFilter(filter.sort);
  car.renderCar();
  filters.initSearchFilter(filter.inputSearch);
  filters.initFiltersValue();
  filters.addCardClickHandler();
  sort.addSortClickHandler();
  filters.addSearchClickHandler();
  filters.addBrandClickHandler();
  filters.addCategoryClickHandler();
  filters.addAgeClickHandler();
  filters.addSaleClickHandler();
  filters.addClickFilterReset();
  filters.addResetSettingClickHandler();
}

window.addEventListener('beforeunload', setLocalStorage);







