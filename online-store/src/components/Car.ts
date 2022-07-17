import {ICar} from '../type/type';

export const car: ICar = {
  
  productOfCar:new Set<string>(),
  
  add(idProduct:string){
    let cardClick=document.querySelector(`div[data-id="${idProduct}"]`);
    if(cardClick){
      if(this.productOfCar.has(idProduct)){
        this.productOfCar.delete(idProduct);
        cardClick.classList.toggle("active");
      } else {
        if (this.productOfCar.size<20){
          this.productOfCar.add(idProduct);
            cardClick.classList.toggle("active");
        } else {
          alert("Car full!");
        }
      }
    }
  },
  getSizeCar(){
    return this.productOfCar.size;
  },
  renderCar(){
    let carView=document.querySelector('.car');
    if(carView){
      carView.innerHTML=`<span>${this.getSizeCar()}</span>`;
    }
  },

  updateCard(productOfCar:Set<string>){
    productOfCar.forEach(elem => {
      let cardClick=document.querySelector(`div[data-id="${elem}"]`);
      if(cardClick) {
        cardClick.classList.add("active");
      }
    });
  }
  
}
