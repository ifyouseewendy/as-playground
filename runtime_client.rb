require "msgpack"
require "json"

# prepare input

input = JSON.parse(File.read("./input.json"))
msg = input.to_msgpack  #=> "\x93\x01\x02\x03"

puts "input: #{input}"
puts "msg: #{msg.bytes}"

File.write("input.msgpack", msg)
puts "write to input.msgpack"

# make request to runtime-engine with the input


# parse the response
