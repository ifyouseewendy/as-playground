import {Decoder, Encoder, Writer, Sizer, Value} from 'as-msgpack'
import {Console} from "as-wasi";

@unmanaged
export class Product {
  public price: i32;

  constructor(price: i32 = 0) {
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
    writer.writeInt32(this.price);
  }

  decode(reader: Decoder): void {
    var numFields = reader.readMapSize();

    while (numFields > 0) {
      numFields--;
      const field = reader.readString();

      if (field == "price") {
        this.price = reader.readInt32();
      } else {
        reader.skip();
      }
    }
  }
}

// This function can be generated during transforming. Currently, it's ignored by transformer by
// starting with __.
// This function will be the real entrance when executed on engine
export function __run(rawInput: ArrayBuffer): ArrayBuffer {
  const input = Product.fromBuffer(rawInput);
  const output = run(input);
  const raw_output = output.toBuffer();
  return raw_output;
}

export function run(input: Product): Product {
  return input;
}
