import * as cero from '0http'

import { Logger } from '../logger/logger'
import { Metrics } from '../metrics/metrics'

const { router, server } = cero({})

/**
 * builds a new debugapi router
 */
export default function buildDebugRouter(metrics: Metrics, logger: Logger): any {

    router.get('/metrics', (_req, res) => {
        logger.info("debugapi: handle metrics")

        res.end(metrics.scrape())
    })

    router.get("/health", (_req, res) => {
        logger.info("debugapi: handle health check")
        const response = {
            status: "ok"
        }
        res.end(response)
    })

    return server
}