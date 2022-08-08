import { getWinners } from './api';
import { updatePagination } from './controllerPage';
import { renderWinners } from './pageView';
import { store } from './store';
import { SortValueStrings } from './type';

const MAX_COUNT_WINNERS = 10;

export const updateStateWinners = async () => {
  const { items, count } = await getWinners({
    page: store.winnersPage,
    sort: store.sortBy,
    order: store.sortOrder,
  });
  store.winners = items;
  store.winnersCount = count;
  updatePagination(store.winnersPage, +store.winnersCount, MAX_COUNT_WINNERS);
};

const setSortOrder = async (sortBy: SortValueStrings) => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  store.sortBy = sortBy;
  await updateStateWinners();
  const winnersView = document.querySelector('#winners-view') as HTMLDivElement;
  winnersView.innerHTML = renderWinners();
};

export const addListenerTableWinners = () => {
  const elementClick = document.querySelector('#winners-view') as HTMLDivElement;
  elementClick.addEventListener('click', async (event: Event) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains('table-wins')) {
      setSortOrder('wins');
    }
    if (element.classList.contains('table-time')) {
      setSortOrder('time');
    }
  });
};
