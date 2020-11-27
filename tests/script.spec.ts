import {run, Product} from 'script';
import { Decoder, Writer, Encoder, Sizer } from 'as-msgpack';

describe('run', () => {
  it('work', () => {
    let product = new Product(42);
    let input = product.toBuffer();

    let output = run(input);
    expect<ArrayBuffer>(output).toBeTruthy();

    let result = Product.fromBuffer(output);
    expect(result.price).toBe(42);
  });
});
