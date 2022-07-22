import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { cards } from '..';
import { car } from './Car';
import { filter } from './storage';

enum nameRange {
  price = 1,
  amount,
}

function rangeInit(
  rangeItem: string,
  elemMin: string,
  elemMax: string,
  min: number,
  max: number,
  name: string,
  start: number,
  end: number
) {
  const range = document.getElementById(rangeItem) as noUiSlider.target;
  const inputMin = document.getElementById(elemMin) as HTMLInputElement;
  const inputMax = document.getElementById(elemMax) as HTMLInputElement;

  if (!range || !inputMin || !inputMax) return;
  const inputs = [inputMin, inputMax];

  noUiSlider.create(range, {
    start: [min, max],
    connect: true,
    range: {
      min: start,
      max: end,
    },
    tooltips: true,
    step: 1,
  });
  range.noUiSlider?.on('update', function (values, handle) {
    inputs[handle].value = values[handle] as string;
    if (nameRange[1] === name) {
      filter.maxPrice = Number(inputMax.value);
      filter.minPrice = Number(inputMin.value);
    }
    if (nameRange[2] === name) {
      filter.maxAmount = Number(inputMax.value);
      filter.minAmount = Number(inputMin.value);
    }
    cards.filterProducts(cards.catalog, car.productOfCar);
  });
  inputMin.addEventListener('change', function () {
    range.noUiSlider?.set([this.value, (null as unknown) as number]);
  });
  inputMax.addEventListener('change', function () {
    range.noUiSlider?.set([(null as unknown) as number, this.value]);
  });
}

export const initSliders = () => {
  rangeInit(
    'range-price',
    'min-price',
    'max-price',
    filter.minPrice,
    filter.maxPrice,
    nameRange[1],
    5,
    50
  );
  rangeInit(
    'range-amount',
    'min-amount',
    'max-amount',
    filter.minAmount,
    filter.maxAmount,
    nameRange[2],
    1,
    20
  );
};
