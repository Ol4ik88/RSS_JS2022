export interface IProduct {
  id: string,
  category: string,
  name: string,
  brand: string,
  amount: number,
  img: string,
  price: number,
  sale: boolean,
  age: string
}

export interface ICar {
  productOfCar: Set<string>,
  add(idProduct:string):void,
  getSizeCar():number,
  renderCar():void,
  updateCard(productOfCar:Set<string>):void
}

export interface IFilter {
  minPrice:number,
  maxPrice:number,
  minAmount:number,
  maxAmount:number,
  brand: Set<string>,
  category: Set<string>,
  age: Set<string>,
  onlySale: boolean,
  sort:string,
  inputSearch:string
}

export const valueBrand:Record<string,string> = {
  "button_aurora": "Aurora", 
  "button_funcy": "Funcy", 
  "button_kids": "Kids", 
  "button_cubika": "Cubika",
}

export const valueCategory:Record<string,string> = {
  "button_stuffed": "Stuffed Animals", 
  "button_wooden": "Wooden Toys", 
  "button_educational": "Education Toys", 
}

export const valueAge:Record<string,string> = {
  "button_small": "0+", 
  "button_large": "3+", 
}