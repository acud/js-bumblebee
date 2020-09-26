import { Address } from './address'

export class Chunk {
    private addr: Address;
    private data: Buffer;

    /**
     * 
     * @param address the chunk Address
     * @param data chunk data including span
     */
    constructor(address: Address, data: any) {
        this.addr = address
        this.data = Buffer.from(data)
    }

    public getData(): Uint8Array {
        return Uint8Array.from(this.data)
    }

    public getAddress(): Address {
        return this.addr
    }
}

