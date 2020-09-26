import { Chunk } from '../swarm/chunk'
import { Address } from '../swarm/address'
import { ChunkClient, GetChunkOptions, PutChunkOptions } from './interface'
import axios, { AxiosInstance } from "axios"
import { Logger } from '../logger/logger'
import { FORMAT_TEXT_MAP } from 'opentracing'
import { Tracer } from '../tracing/tracer'


const chunkApiUrl = "/chunks/"
const errGetChunk = "could not get chunk"
function chunkAddressUri(addr: Address): string {
    const ret = chunkApiUrl + addr.toString()
    return ret
}


/**
 * Bee backend client that does chunk operations
 * uses https://www.npmjs.com/package/axios
 */
export class BeeHttpClient implements ChunkClient {
    private axiosInstance: AxiosInstance
    private logger: Logger
    private tracer: Tracer

    constructor(proxyUrl: string, logger: Logger, tracer?: Tracer) {
        this.axiosInstance = axios.create({
            baseURL: 'http://' + proxyUrl + '/',
            timeout: 1000,
            // headers: {'X-Custom-Header': 'foobar'}
        });
        this.logger = logger
        this.tracer = tracer
    }


    public async getChunk(addr: Address, options?: GetChunkOptions): Promise<Chunk> {
        this.logger.trace("getting chunk", addr.toString())
        const extraHeaders = {}
        if (options != null && options.tracingContext !== undefined) {
            this.tracer.inject(options.tracingContext, FORMAT_TEXT_MAP, extraHeaders)
            console.debug(extraHeaders)
        }
        const c = await this.axiosInstance.get(chunkAddressUri(addr), { headers: extraHeaders })
        if (c.status != 200) {
            this.logger.error("could not get chunk", addr.toString(), "code", c.status)
            throw errGetChunk
        }
        const ch = new Chunk(addr, c.data)
        return ch
    }

    public async putChunk(ch: Chunk, options?: PutChunkOptions): Promise<void> {
        this.logger.trace("putting chunk", ch.getAddress().toString())

        const extraHeaders = {}
        if (options != null && options.tracingContext !== undefined) {
            this.tracer.inject(options.tracingContext, FORMAT_TEXT_MAP, extraHeaders)
            console.debug(extraHeaders)
        }
        const c = await this.axiosInstance.post(chunkAddressUri(ch.getAddress()), ch.getData(), { headers: extraHeaders })
        console.log("pushed chunk, code", c.status)
        return
    }

}