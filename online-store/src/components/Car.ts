import { ICar } from '../type/type';
import { Modal } from '../components/Modal';

export const car: ICar = {
  productOfCar: new Set<string>(),

  add(idProduct: string) {
    const cardClick = document.querySelector(`div[data-id="${idProduct}"]`);
    if (cardClick) {
      if (this.productOfCar.has(idProduct)) {
        this.productOfCar.delete(idProduct);
        cardClick.classList.toggle('active');
      } else {
        if (this.productOfCar.size < 20) {
          this.productOfCar.add(idProduct);
          cardClick.classList.toggle('active');
        } else {
          renderModalWindow('Sorry, but all the slots in the cart are full');
        }
      }
    }
  },
  getSizeCar() {
    return this.productOfCar.size;
  },
  renderCar() {
    const carView = document.querySelector('.car');
    if (carView) {
      carView.innerHTML = `<span>${this.getSizeCar()}</span>`;
    }
  },

  updateCard<T>(itemOfCar: Set<T>) {
    itemOfCar.forEach((elem) => {
      const cardClick = document.querySelector(`div[data-id="${elem}"]`);
      if (cardClick) {
        cardClick.classList.add('active');
      }
    });
  },

  clearCar() {
    this.productOfCar.forEach((elem) => {
      const cardClick = document.querySelector(`div[data-id="${elem}"]`);
      if (cardClick) {
        cardClick.classList.remove('active');
      }
    });
    car.productOfCar.clear();
    car.renderCar();
  },
};

const renderModalWindow = (content: string | HTMLElement) => {
  const modal = new Modal('modal');
  modal.buildModal(content);
};
