import { IProduct } from '../type/type';

export default class Card implements IProduct {
  constructor(
    public id: string,
    public category: string,
    public name: string,
    public brand: string,
    public amount: number,
    public img: string,
    public price: number,
    public sale: boolean,
    public age: string
  ) {}

  createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', this.id);

    const imgCard = document.createElement('img');
    imgCard.classList.add('card__img');
    imgCard.setAttribute('alt', 'photo toys');
    imgCard.src = this.img;
    card.appendChild(imgCard);

    const nameCard = document.createElement('h4');
    nameCard.classList.add('card__title');
    nameCard.innerHTML = this.name;
    card.appendChild(nameCard);

    const prop = document.createElement('ul');
    prop.classList.add('card__prop');

    let saleValue: string;
    this.sale ? (saleValue = 'SALE') : (saleValue = '');

    prop.innerHTML = `<li>${this.category}</li>
    <li>${this.brand}</li>
    <li>Amount: ${this.amount}</li>
    <li>${saleValue}</li>
    <li><b>Price: ${this.price}</b></li>`;
    card.appendChild(prop);
    return card;
  }
}
