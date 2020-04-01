cd ~/runtime-engine
cargo run --bin runtime-engine-cli -- \
  --wasm ~/assembly-script-demo/script.wasm \
  --schema ~/assembly-script-demo/schema \
  ~/assembly-script-demo/input.json
