import {get_input_len, copy_input, write_output} from './shopify';
import {Decoder, Encoder, Writer, Sizer, Value} from 'as-msgpack';
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
export function __run(): void {
  let raw_input = getInput();
  const input = Product.fromBuffer(raw_input);

  const output = run(input);

  const raw_output = output.toBuffer();
  write_output(raw_output, raw_output.byteLength);
}

export function run(input: Product): Product {
  return input;
}

function getInput(): ArrayBuffer {
  let len = get_input_len();
  let inputBuffer = new ArrayBuffer(<i32>len);
  copy_input(inputBuffer);
  return inputBuffer;
}
