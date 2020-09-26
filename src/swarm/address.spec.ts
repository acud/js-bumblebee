import { Address } from './address'

const expResult = Uint8Array.from([1, 2, 3])
const str = "010203"

test('test unpack', () => {
    const a = new Address(str)
    const bytes = a.bytes()
    expect(bytes).toStrictEqual(expResult);
});

test('test uint8 ctor', () => {
    const val = Uint8Array.from([1, 2, 3])
    const a = new Address(val)
    const bytes = a.bytes()
    expect(bytes).toStrictEqual(expResult);
})

test('test toString', () => {
    const val = Uint8Array.from([1, 2, 3])
    const a = new Address(val)
    const s = a.toString()
    expect(s).toBe(str);
})
