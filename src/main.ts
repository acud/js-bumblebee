import { BeeHttpClient } from './bee/client';
import buildRouter from './api/router';
import buildDebugRouter from './debugapi/router'
import * as minimist from 'minimist';
import * as config from './config/config'
import { BunyanLogger } from './logger/logger';
import { PrometheusMetrics } from './metrics/metrics';
import { OpenTracer } from './tracing/tracer';


const argv = minimist(process.argv.slice(2));
const cfg = config.parseArgs(argv)
const log = new BunyanLogger(cfg.Verbosity)
const metrics = new PrometheusMetrics()
const tracer = new OpenTracer(cfg.JaegerServiceName,log,"")

async function newBumblebee(cfg: config.Config) {
  const client = new BeeHttpClient(cfg.BeeListenAddress,log,tracer)
  const router = buildRouter(client, log, metrics,tracer)

  log.info(`bumblebee starting on port ${cfg.ListenPort}`)
  router.listen(cfg.ListenPort)
}

function newDebugApi(cfg: config.Config) {
  const router = buildDebugRouter(metrics, log)
  log.info(`debugapi starting on port ${cfg.DebugApiPort}`)

  router.listen(cfg.DebugApiPort)
}

newBumblebee(cfg)
if (cfg.DebugApiEnabled) {
  newDebugApi(cfg)
}
