import { pack, unpack } from '../util/hex';

/**
 * 
 */
export class Address {
    private addr: Uint8Array;

    /**
     * 
     * @param addr 32 byte swarm reference in either hex encoded string or a uint8array format
     */
    constructor(addr: string | Uint8Array) {
        if (typeof addr === "string") {
            const b = unpack(addr as string)
            this.addr = b
        }
        if (addr instanceof Uint8Array) {
            this.addr = addr
        }
    }

    /**
     * 
     */
    public bytes(): Uint8Array {
        return this.addr
    }

    public toString(): string {
        return pack(this.addr)
    }
}

