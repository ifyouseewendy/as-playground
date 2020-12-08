cur_dir := `pwd`
runtime_engine := "~/runtime-engine"

build:
  npm run asbuild

test:
	npm test

cli-deploy-and-run:
  cd {{runtime_engine}} && \
  cargo run --bin runtime-engine-cli -- \
    --wasm {{cur_dir}}/build/script.wasm \
    --schema {{cur_dir}}/schema \
    {{cur_dir}}/input.json

deploy:
  curl -s \
    -F bytecode=@./build/script.wasm \
    -F schema=@./schema \
    http://localhost:19989/module/ | jq -r '.hash'

run moduleid="66f57e02-4c9c-4e4f-b501-ce1d273341fe":
	curl -s \
		--header "Content-Type: application/msgpack" \
		--data-binary "@input.msgpack" \
		--request POST \
		http://localhost:19989/module/{{moduleid}}

deploy-and-run:
	#!/usr/bin/env bash
	moduleid=`just deploy`
	echo "moduleid: $moduleid"
	echo `just run $moduleid`
