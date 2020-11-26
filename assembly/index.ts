import { Console } from "as-wasi";

export function abort(
  message: string | null,
  fileName: string | null,
  lineNumber: u32,
  columnNumber: u32
): void {
  let errorMsg = "Error!";
  if (message != null) {
    errorMsg += " message: " + message! + ", ";
  }
  if (fileName != null) {
    errorMsg += " filename: " + fileName! + ", ";
  }
  errorMsg += " line number: " + lineNumber.toString() + ", ";
  errorMsg += " column number: " + columnNumber.toString();
  Console.error(errorMsg);
}

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

