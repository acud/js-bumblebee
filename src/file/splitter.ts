import * as swarm from 'swarm-lowlevel'
import { Content } from 'swarm-lowlevel/chunk/index'
import { ChunkClient } from '../bee/interface';
import { Chunk } from '../swarm/chunk';
import { Address } from '../swarm/address';

export function split(data: any, client: ChunkClient): Address {
    const cb = (ch: Content) => {
        console.log("got chunk", ch)
        const b = Buffer.concat([ch.span, ch.data])
        console.log(b)
        const c = new Chunk(new Address(ch.reference), b)
        client.putChunk(c)
    }

    const fh = new swarm.fileSplitter(cb);

    const d = Buffer.from(data);
    const swarmhash = fh.split(d)
    return new Address(swarmhash)
}