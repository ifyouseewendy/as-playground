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

export function run(input: ArrayBuffer): Product {
  const product = decodeInputs(input);
  return product;
}

function decodeInputs(input: ArrayBuffer): Product {
  const decoder = new Decoder(input);
  let product = new Product();
  product.decode(decoder);
  return product;
}
