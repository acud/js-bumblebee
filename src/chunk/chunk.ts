class Chunk {
    private addr: Address;
    private data: Buffer;
    constructor(address: Address, data: any) {
        this.addr = address
        this.data = Buffer.from(data)
    }

    /**
     * data(: Uint8Array   */
    public getData(): Uint8Array {
        return Uint8Array.from(this.data)
    }
}

class Address {
    /**
     *
     */
    constructor() {


    }
}