import { getCars, getWinners } from './api';
import { IStore } from './type';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

export const store: IStore = {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation: {},
  view: 'garage',
  sortBy: '',
  sortOrder: '',
};
