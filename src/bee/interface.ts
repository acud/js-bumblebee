import { Chunk } from "../swarm/chunk";
import { Address } from '../swarm/address';
import { Span, SpanContext } from 'opentracing';

export interface ChunkClient {
    getChunk(addr: Address, options?: GetChunkOptions): Promise<Chunk>
    putChunk(ch: Chunk, options?: PutChunkOptions)
}


class TracedRequest {
    tracingContext: Span | SpanContext
}

export class GetChunkOptions extends TracedRequest{}
export class PutChunkOptions extends TracedRequest{}
