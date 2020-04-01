@unmanaged
export class Product {
  public price: i32;
  constructor(price: i32) {
    this.price = price;
  }
}

export function run(product: Product): Product {
  return product
}

export function shopify_runtime_allocate(size: u32): ArrayBuffer { return new ArrayBuffer(size); }
