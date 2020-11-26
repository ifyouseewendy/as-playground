cur_dir := `pwd`
runtime_engine := "~/runtime-engine"

build:
  npm run asbuild

run:
  cd {{runtime_engine}} && \
  cargo run --bin runtime-engine-cli -- \
    --wasm {{cur_dir}}/build/script.wasm \
    --schema {{cur_dir}}/schema \
    {{cur_dir}}/input.json
