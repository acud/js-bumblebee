// eslint-disable-next-line @typescript-eslint/no-var-requires
const swarm = require('swarm-lowlevel')

import * as bigInt from 'big-integer'

export function HashBmt(buf: any): Uint8Array {
    const bh = new swarm.bmtHasher()
    //const vv = Buffer.concat([span, buf])
    const vv = buf
    bh.reset(vv.length);
    bh.setSpan(vv.length);
    bh.update(vv);
    const bmthash = bh.digest();
    return Uint8Array.from(bmthash)
}


export function MarshalUint64(n: any): Buffer {
    const poly = bigInt(n);

    const b = Buffer.from(poly.toArray(256).value.reverse());
    if (b.length > 8) {
        throw "not a valid bigint or convertible value";
    }

    const diff = 8 - b.length;
    const pad = Buffer.alloc(diff);
    return Buffer.concat([b, pad]);
}