import {
  createCar,
  deleteCar,
  deleteWinner,
  drive,
  getCar,
  getCars,
  saveWinner,
  startEngine,
  stopEngine,
  updateCar,
} from './api';
import { updatePagination } from './controllerPage';
import { renderGarage } from './pageView';
import { store } from './store';
import { ICar, IStartDriving, OperationStart, OperationStop } from './type';
import { animation, generateRandomCars, getDistance, race } from './utils';

let selectedCar: ICar | null = null;
const MAX_COUNT_CARS = 7;

export const updateStateGarage = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;
  updatePagination(store.carsPage, +store.carsCount, MAX_COUNT_CARS);
};

const startDriving = async (id: number): Promise<IStartDriving> => {
  const startButton = <HTMLButtonElement>document.querySelector(`#start-car-${id}`);
  startButton.disabled = true;
  startButton.classList.toggle('enabling', true);

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  startButton.classList.toggle('enabling', false);

  const stopButton = <HTMLButtonElement>document.querySelector(`#stop-car-${id}`);
  stopButton.disabled = false;

  const car = document.querySelector(`#car-${id}`) as HTMLElement;
  const flag = document.querySelector(`#flag-${id}`) as HTMLElement;
  const htmlDist = Math.floor(getDistance(car, flag)) + 100;
  store.animation[id] = animation(car, htmlDist, time);
  const { success } = await drive(id);
  if (!success) window.cancelAnimationFrame(store.animation[id].idAnim);
  return { success, id, time };
};

const stopDriving = async (id: number) => {
  const stopButton = <HTMLButtonElement>document.querySelector(`#stop-car-${id}`);
  stopButton.disabled = true;
  stopButton.classList.toggle('enabling', true);
  await stopEngine(id);
  stopButton.classList.toggle('enabling', false);
  const startButton = <HTMLButtonElement>document.querySelector(`#start-car-${id}`);
  startButton.disabled = false;

  const car = document.querySelector(`#car-${id}`) as HTMLElement;
  car.style.transform = `translateX(0)`;
  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].idAnim);
};

const addListenerCreateButton = () => {
  document.querySelector('#create')?.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    const nameCar = (document.querySelector('#create-name') as HTMLInputElement).value;
    const colorCar = (document.querySelector('#create-color') as HTMLInputElement).value;
    await createCar({ name: nameCar, color: colorCar });
    await updateStateGarage();
    (document.querySelector('#garage') as HTMLElement).innerHTML = renderGarage();
    (document.querySelector('#create-name') as HTMLInputElement).value = '';
    (event.target as HTMLButtonElement).disabled = true;
  });
};

const addListenerUpdateButton = () => {
  document.querySelector('#update')?.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    const nameCar = (document.querySelector('#update-name') as HTMLInputElement).value;
    const colorCar = (document.querySelector('#update-color') as HTMLInputElement).value;
    await updateCar((selectedCar as ICar).id, { name: nameCar, color: colorCar });
    await updateStateGarage();
    (document.querySelector('#garage') as HTMLElement).innerHTML = renderGarage();
    (document.querySelector('#update-name') as HTMLInputElement).value = '';
    (document.querySelector('#update-name') as HTMLInputElement).disabled = true;
    (document.querySelector('#update-color') as HTMLInputElement).disabled = true;
    (document.querySelector('.update-submit') as HTMLInputElement).disabled = true;
    selectedCar = null;
  });
};

const addListenerRaceControl = () => {
  const elementClick = document.querySelector('.race-controls') as HTMLDivElement;
  elementClick.addEventListener('click', async (event: Event) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains('generator-button')) {
      (element as HTMLButtonElement).disabled = true;
      const cars = generateRandomCars();
      await Promise.all(cars.map(async (car) => await createCar(car)));
      await updateStateGarage();
      (document.querySelector('#garage') as HTMLElement).innerHTML = renderGarage();
      (element as HTMLButtonElement).disabled = false;
    }
    if (element.classList.contains('race-button')) {
      (element as HTMLButtonElement).disabled = true;
      const winner = await race(startDriving);
      await saveWinner(winner);
      const message = document.querySelector('#message') as HTMLElement;
      message.innerHTML = `${winner.name} won, ${winner.time}s`;
      message.classList.toggle('visible', true);
      (document.querySelector('#reset') as HTMLButtonElement).disabled = false;
    }
    if (element.classList.contains('reset-button')) {
      (element as HTMLButtonElement).disabled = true;
      store.cars.map(({ id }) => stopDriving(id));
      const message = document.querySelector('#message') as HTMLElement;
      message.classList.toggle('visible', false);
      (document.querySelector('#race') as HTMLButtonElement).disabled = false;
    }
  });
};

const addClickButtonHandler = (element: HTMLElement, classBtn: string, action: OperationStart | OperationStop) => {
  if (element.classList.contains(`${classBtn}-button`)) {
    const id = +element.id.split(`${classBtn}-car-`)[1];
    action(id);
  }
};

const addListenerGarage = () => {
  const elementClick = document.querySelector('#garage') as HTMLDivElement;
  elementClick.addEventListener('click', async (event: Event) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains('select-button')) {
      selectedCar = (await getCar(+element.id.split('select-car-')[1])) as ICar;
      (document.querySelector('#update-name') as HTMLInputElement).value = selectedCar.name;
      (document.querySelector('#update-color') as HTMLInputElement).value = selectedCar.color;
      (document.querySelector('#update-name') as HTMLInputElement).disabled = false;
      (document.querySelector('#update-color') as HTMLInputElement).disabled = false;
      (document.querySelector('.update-submit') as HTMLButtonElement).disabled = false;
    }
    if (element.classList.contains('remove-button')) {
      const id = +element.id.split('remove-car-')[1];
      await deleteCar(id);
      await deleteWinner(id);
      await updateStateGarage();
      (document.querySelector('#garage') as HTMLElement).innerHTML = renderGarage();
    }
    addClickButtonHandler(element, 'start', startDriving);
    addClickButtonHandler(element, 'stop', stopDriving);
  });
};

export const addlistenerGarage = () => {
  addListenerRaceControl();
  addListenerGarage();
  addListenerCreateButton();
  addListenerUpdateButton();
};
