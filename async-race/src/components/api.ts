import { ICar, IBodyCar, IGetWins, SortValueStrings, OrderValueStrings, IDrive, IStartEngine } from './type';
const urlServer = 'http://127.0.0.1:3000';
const garage = `${urlServer}/garage`;
const engine = `${urlServer}/engine`;
const winners = `${urlServer}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: (await res.json()) as ICar[],
    count: res.headers.get('X-Total-Count') as string,
  };
};

export const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: IBodyCar): Promise<ICar> =>
  (
    await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const deleteCar = async (id: number): Promise<void> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    })
  ).json();

export const updateCar = async (id: number, body: IBodyCar): Promise<ICar> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

export const startEngine = async (id: number): Promise<IStartEngine> =>
  (
    await fetch(`${engine}?id=${id}&status=started`, {
      method: 'PATCH',
    })
  ).json();

export const stopEngine = async (id: number): Promise<void> =>
  (
    await fetch(`${engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    })
  ).json();

export const drive = async (id: number): Promise<IDrive> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: SortValueStrings, order: OrderValueStrings) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page,
  limit = 10,
  sort = '',
  order = '',
}: {
  page: number;
  limit?: number;
  sort?: SortValueStrings;
  order?: OrderValueStrings;
}) => {
  const res = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items: IGetWins[] = await res.json();
  return {
    items: await Promise.all(
      items.map(async (winner) => ({
        ...winner,
        car: (await getCar(winner.id)) as ICar,
      }))
    ),
    count: res.headers.get('X-Total-Count') as string,
  };
};

export const getWinner = async (id: number): Promise<IGetWins> => {
  const res = await fetch(`${winners}/${id}`);
  return res.json();
};

export const getWinnersStatus = async (id: number) => {
  const res = await fetch(`${winners}/${id}`);
  return res.status;
};

export const deleteWinner = async (id: number): Promise<void> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'DELETE',
    })
  ).json();

export const createWinner = async (body: IGetWins): Promise<IGetWins> =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (id: number, body: IGetWins): Promise<IGetWins> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({ id, time }: { id: number; time: number }) => {
  const winnerStatus = await getWinnersStatus(id);
  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
