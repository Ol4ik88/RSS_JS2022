import { store } from './store';
import { ICar, IStartDriving, IWinner, OperationStart } from './type';

function getPositionAtCenter(el: HTMLElement) {
  const { top, left, width, height } = el.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistance(a: HTMLElement, b: HTMLElement) {
  const aPos = getPositionAtCenter(a);
  const bPos = getPositionAtCenter(b);
  return Math.hypot(aPos.x - bPos.x, aPos.y - bPos.y);
}

export function animation(car: HTMLElement, distance: number, timeOfAnimation: number) {
  let start = 0;
  const state: { [key: string]: number } = {};
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const progress = Math.round(time * (distance / timeOfAnimation));
    car.style.transform = `translateX(${Math.min(progress, distance)}px)`;
    if (progress < distance) {
      state.idAnim = window.requestAnimationFrame(step);
    }
  }
  state.idAnim = window.requestAnimationFrame(step);
  return state;
}

export const raceAll = async (promises: Promise<IStartDriving>[], ids: number[]): Promise<IWinner> => {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const failedCar = ids.findIndex((i) => i === id);
    const restPromises = [
      ...promises.slice(0, failedCar),
      promises.slice(failedCar + 1, promises.length),
    ] as Promise<IStartDriving>[];
    const restIds = [...ids.slice(0, failedCar), ...ids.slice(failedCar + 1, ids.length)];
    return raceAll(restPromises, restIds);
  }
  return { ...(store.cars.find((car) => car.id === id) as ICar), time: +(time / 1000).toFixed(2) };
};

export const race = async (action: OperationStart) => {
  const promises = store.cars.map(({ id }) => action(id));
  const winner = await raceAll(
    promises,
    store.cars.map((car) => car.id)
  );
  return winner;
};

const models = [
  'Durango',
  'Ram',
  'Challenger',
  'Charger',
  'X7',
  'X5',
  'X3',
  'C1',
  'C3',
  'Logan',
  'Captur',
  'Kadjar',
  'RAV4',
  'Rio',
  'Creta',
  'Solaris',
];

const brands = [
  'Saab',
  'Saipa',
  'SEAT',
  'Skoda',
  'Subaru',
  'Suzuki',
  'Tata',
  'Tesla',
  'Torsus',
  'Toyota',
  'VinFast',
  'Volkswagen',
  'Volvo',
];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = brands[Math.floor(Math.random() * brands.length)];
  return `${model} ${name}`;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCars = (count = 100) =>
  new Array(count).fill(1).map(() => ({
    name: getRandomName(),
    color: getRandomColor(),
  }));
