import { initTracer } from 'jaeger-client'
import { Logger } from '../logger/logger';
import { Metrics } from '../metrics/metrics';
import { Span, FORMAT_TEXT_MAP, SpanOptions, SpanContext, Tracer as OpenTracingTracer } from 'opentracing'

export interface Tracer {
    startSpan(span: string): Span
    inject(span: Span | SpanContext, format: string, carrier: any): void
}

/**
 * OpenTracer is an OpenTracing Tracer implementation
 */
export class OpenTracer implements Tracer {
    private tracer: OpenTracingTracer

    constructor(namespace: string, logger: Logger, endpoint: string, username?: string, password?: string, _metrics?: Metrics) {

        // if no endpoint set - use NoopTracer from opentracing
        if (endpoint == "") {
            this.tracer = new OpenTracingTracer()
            return
        }
        
        const config = {
            serviceName: namespace,
            reporter: {
                collectorEndpoint: endpoint,
                username: username,
                password: password,
            }
        }

        const options = {
            //   metrics: new PrometheusMetricsFactory(promClient, config.serviceName),
            logger: logger,
        };
        this.tracer = initTracer(config, options);
    }
    inject(span: Span | SpanContext, _format: string, carrier: any): void {
        // format is either FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS or FORMAT_BINARY
        this.tracer.inject(span, FORMAT_TEXT_MAP, carrier)
    }

    /**
     * Starts a new OpenTracing span with the given name
     * @param spanName the span name
     */
    startSpan(spanName: string, options?: SpanOptions): Span {

        const span = this.tracer.startSpan(spanName, options)

        return span
    }

}