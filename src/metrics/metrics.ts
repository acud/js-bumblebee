import { Registry, collectDefaultMetrics, Gauge, Histogram, Summary, Counter } from 'prom-client'

const namespace = "bumblebee"

export interface Metrics {
    counter(name: string, description: string): Counter<string>
    gauge(name: string, description: string): Gauge<string>
    histogram(name: string, description: string): Histogram<string>
    summary(name: string, description: string): Summary<string>

    scrape(): string
}

/**
 * Prometheus metrics abstraction.
 * Uses https://github.com/siimon/prom-client under the hood
 */
export class PrometheusMetrics implements Metrics {
    private registry: Registry

    constructor() {
        const register = new Registry();
        this.registry = register
        collectDefaultMetrics({
            register: register,
            prefix: `${namespace}_`,
        });
        //    collectDefaultMetrics({ gcDurationBuckets: [0.1, 0.2, 0.3] });//To prefix metric names with your own arbitrary string, pass in a prefix:
        //   collectDefaultMetrics({ prefix }); //To apply generic labels to all default metrics, pass an object to the labels property (useful if you're working in a clustered environment):
        // collectDefaultMetrics({
        //   labels: { NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE },
        // }); // You can get the full list of metrics by inspecting client.collectDefaultMetrics.metricsList.

        // Default metrics are collected on scrape of metrics endpoint, not on an interval.
    }

    counter(name: string, description: string): Counter<string> {
        const c = new Counter({
            name: `${namespace}_${name}`,
            help: description,
            registers: [this.registry],
        })
        return c
    }

    gauge(name: string, description: string): Gauge<string> {
        const g = new Gauge({
            name: `${namespace}_${name}`,
            help: description,
            registers: [this.registry],
        });

        return g
    }

    histogram(name: string, description: string): Histogram<string> {
        return new Histogram({
            name: `${namespace}_${name}`,
            help: description,
            registers: [this.registry],
            buckets: [0.1, 5, 15, 50, 100, 500],
        });
    }

    summary(name: string, description: string): Summary<string> {
        return new Summary({
            name: `${namespace}_${name}`,
            help: description,
            registers: [this.registry],
            percentiles: [0.01, 0.1, 0.9, 0.99],
        });
    }

    scrape(): string {
        return this.registry.metrics()
    }
}

