import {run, Product} from 'script';
import { Decoder, Writer, Encoder, Sizer } from 'as-msgpack';

describe('run', () => {
  it('work', () => {
    let input = new Product(42);
    let output = run(input.toBuffer());

    expect<Product>(output).toBeTruthy();
    expect(output.price).toBe(42);
  });
});
