import { Console } from "as-wasi";

@unmanaged
export class Product {
  public price: i32;
  constructor(price: i32) {
    this.price = price;
  }
}

export function run(input: Product): Product {
  return input
}
