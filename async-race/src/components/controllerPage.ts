import { addlistenerGarage, updateStateGarage } from './controllerGarage';
import { renderGarage, renderWinners } from './pageView';
import { store } from './store';
import { addListenerTableWinners, updateStateWinners } from './controllerWinners';
import { setDisplayEl } from './utils';

const MAX_COUNT_CARS = 7;
const MAX_COUNT_WINNERS = 10;

export function updatePagination(page: number, count: number, maxCount: number) {
  if (page * maxCount < count) {
    (document.querySelector('#next') as HTMLButtonElement).disabled = false;
  } else {
    (document.querySelector('#next') as HTMLButtonElement).disabled = true;
  }
  if (page > 1) {
    (document.querySelector('#prev') as HTMLButtonElement).disabled = false;
  } else {
    (document.querySelector('#prev') as HTMLButtonElement).disabled = true;
  }
}

const addListenerMenu = () => {
  const elementClick = document.querySelector('.menu') as HTMLDivElement;
  elementClick.addEventListener('click', async (event: Event) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains('button-view-garage')) {
      updatePagination(store.carsPage, +store.carsCount, MAX_COUNT_CARS);
      setDisplayEl(['#garage-view', '#winners-view'], ['block', 'none']);
    }
    if (element.classList.contains('button-view-winners')) {
      setDisplayEl(['#garage-view', '#winners-view'], ['none', 'block']);
      await updateStateWinners();
      (document.querySelector('#winners-view') as HTMLElement).innerHTML = renderWinners();
    }
  });
};

const addClickPaginationHandler = async (element: HTMLElement, classBtn: 'prev' | 'next') => {
  if (element.classList.contains(`button-${classBtn}`)) {
    switch (store.view) {
      case 'garage': {
        store.carsPage = classBtn === 'prev' ? store.carsPage - 1 : store.carsPage + 1;
        await updateStateGarage();
        (document.querySelector('#garage') as HTMLElement).innerHTML = renderGarage();
        break;
      }
      case 'winners': {
        store.winnersPage = classBtn === 'prev' ? store.winnersPage - 1 : store.winnersPage + 1;
        await updateStateWinners();
        (document.querySelector('#winners-view') as HTMLElement).innerHTML = renderWinners();
        break;
      }
    }
  }
};

const addListenerPagination = () => {
  const elementClick = document.querySelector('.pagination') as HTMLDivElement;
  elementClick.addEventListener('click', async (event: Event) => {
    const element = event.target as HTMLElement;
    addClickPaginationHandler(element, 'prev');
    addClickPaginationHandler(element, 'next');
  });
};

export const listen = () => {
  addListenerMenu();
  addlistenerGarage();
  addListenerPagination();
  addListenerTableWinners();
};
