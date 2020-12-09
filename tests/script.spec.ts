import {run, __run, Product} from 'script';
import { Decoder, Writer, Encoder, Sizer } from 'as-msgpack';
import {Console} from "as-wasi";

describe('__run', () => {
  it('work', () => {
    __run();
    // let product = new Product(42);
    // let input = product.toBuffer();
    //
    // let output = test_run(input);
    // expect<ArrayBuffer>(output).toBeTruthy();
    // log(output);
    // let a = Uint8Array.wrap(output);
    // a.forEach(function(v, i, s) {
    //   log(v);
    // });
    // // 129, 165, 112, 114, 105, 99, 101, 42
    // //
    // // from engine
    // // 129, 165, 112, 114, 105, 99, 101, 0
    //
    // let result = Product.fromBuffer(output);
    // expect(result.price).toBe(42);
  });
});
