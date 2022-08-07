export interface IBodyCar {
  name: string;
  color: string;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ISortWins {
  id: number;
  wins: number;
  time: number;
}

export interface IWinner {
  name: string;
  color: string;
  id: number;
  time: number;
}

export interface IWinners {
  car: ICar;
  id: number;
  wins: number;
  time: number;
}

export type OperationStart = (id: number) => Promise<IStartDriving>;
export type OperationStop = (id: number) => Promise<void>;

export interface IDrive {
  success: boolean;
}

export interface IStartDriving {
  success: boolean;
  id: number;
  time: number;
}

enum SortValue {
  'id',
  'wins',
  'time',
  '',
}

export type SortValueStrings = keyof typeof SortValue;

enum OrderValue {
  'asc',
  'desc',
  '',
}

export type OrderValueStrings = keyof typeof OrderValue;

export interface IStore {
  carsPage: number;
  cars: ICar[];
  carsCount: string;
  winnersPage: number;
  winners: IWinners[];
  winnersCount: string;
  animation: { [key: number]: { [key: string]: number } };
  view: string;
  sortBy: SortValueStrings;
  sortOrder: OrderValueStrings;
}
