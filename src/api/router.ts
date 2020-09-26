import * as cero from '0http'
import { ChunkClient } from '../bee/interface'
import { Address } from '../swarm/address'
import { Logger } from '../logger/logger'
import { Metrics } from '../metrics/metrics'
import { Counter } from 'prom-client'
import { split } from '../file/splitter'
import { Tracer } from '../tracing/tracer'

const { router, server } = cero({})

/**
 * builds a new api router
 */
export default function buildRouter(client: ChunkClient, logger: Logger, metrics: Metrics, tracer: Tracer): any {

    const routerMetrics = new RouterMetrics(metrics)

    router.get('/chunks/:addr', (req, res) => {
        logger.info("api: handle chunk retrieval", "addr", req.params.addr)

        const addr = new Address(req.params.addr)
        const span = tracer.startSpan("chunk-get")
        client.getChunk(addr,{tracingContext: span}).then((ch) => {
            routerMetrics.chunkGets.inc(1)
            logger.info("got data from bee", ch.getData())

            let arr = Array.from(ch.getData())
            arr = arr.slice(8)
            res.end(bin2String(arr))
        })
    })

    router.post('/chunks/:addr', (req, res) => {
        routerMetrics.chunkPosts.inc(1)
        logger.info("api: handle chunk post", "addr", req.params.addr)
        res.statusCode = 201
        res.end()
    })
 
    router.post('/bytes/', (req, res) => {
        logger.info("api: handle post bytes")
        routerMetrics.bytesPosts.inc(1)

        let body = "";
        req.on('data', function (chunk) {
            console.log(typeof chunk)
            body += chunk;
        });
        req.on('end', function () {
            logger.info('POSTed: ' + body);
            const address = split(body, client)
            res.statusCode = 200
            res.end(address.toString())
        });
    })

    return server
}

function bin2String(array) {
    let result = "";
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i], 10));
    }
    return result
}


class RouterMetrics {
    public readonly chunkGets: Counter<string>
    public readonly chunkPosts: Counter<string>
    public readonly bytesGets: Counter<string>
    public readonly bytesPosts: Counter<string>

    constructor(metrics: Metrics) {
        this.chunkGets = metrics.counter("router_chunks_get", "chunk get request counter")
        this.chunkPosts = metrics.counter("router_chunks_post", "chunk post request counter")
        this.bytesGets = metrics.counter("router_bytes_get", "bytes get request counter")
        this.bytesPosts = metrics.counter("router_bytes_post", "bytes post request counter")
    }
}