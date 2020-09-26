export function pack(bytes: Uint8Array): string {
  let str = "";
  for (let i = 0; i < bytes.length; i += 1) {
    str += byteToHex(bytes[i])
  }
  return str;
}

export function unpack(hexString: string): Uint8Array {
  const result = [];
  while (hexString.length >= 2) {
    result.push(parseInt(hexString.substring(0, 2), 16));
    hexString = hexString.substring(2, hexString.length);
  }
  return Uint8Array.from(result);
}


function byteToHex(byte) {
  if (byte < 16) {
    return '0' + byte.toString(16);
  } else {
    return byte.toString(16);
  }
}