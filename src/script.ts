import {Decoder, Encoder, Writer, Sizer, Value} from 'as-msgpack'
import {Console} from "as-wasi";

@unmanaged
export class Product {
  public price: u8;

  constructor(price: u8 = 0) {
    this.price = price;
  }

  toBuffer(): ArrayBuffer {
    const sizer = new Sizer();
    this.encode(sizer);
    const buffer = new ArrayBuffer(sizer.length);
    const encoder = new Encoder(buffer);
    this.encode(encoder);
    return buffer;
  }

  static fromBuffer(buffer: ArrayBuffer): Product {
    let product = new Product();

    const decoder = new Decoder(buffer);
    product.decode(decoder);

    return product;
  }

  encode(writer: Writer): void {
    writer.writeMapSize(1);
    writer.writeString("price");
    writer.writeUInt8(this.price);
  }

  decode(reader: Decoder): void {
    var numFields = reader.readMapSize();

    while (numFields > 0) {
      numFields--;
      const field = reader.readString();

      if (field == "price") {
        this.price = reader.readUInt8();
      } else {
        reader.skip();
      }
    }
  }
}

export function run(input: ArrayBuffer): ArrayBuffer {
  const product = Product.fromBuffer(input);
  // logic with product
  return product.toBuffer();
}
