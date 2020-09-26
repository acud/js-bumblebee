import { PrometheusMetrics } from "./metrics";

let prom: PrometheusMetrics

beforeAll(() => {
    prom = new PrometheusMetrics()
})

test('test counter', () => {
    const metricName = "metric_c"
    const metricHelp = "help"

    const counter = prom.counter(metricName, metricHelp)
    counter.inc(1)

    const scrape = prom.scrape()
    expect(scrape).toContain("bumblebee_metric_c 1")
});

test('test gauge', () => {
    const metricName = "metric_g"
    const metricHelp = "help"

    const gauge = prom.gauge(metricName, metricHelp)
    gauge.inc(1)

    const scrape = prom.scrape()
    expect(scrape).toContain("bumblebee_metric_g 1")
})

test('test histogram', () => {
    const metricName = "metric_h"
    const metricHelp = "help"

    const histogram = prom.histogram(metricName, metricHelp)
    histogram.observe(1.99)

    const scrape = prom.scrape()
    expect(scrape).toContain("bumblebee_metric_h_sum 1.99")
    expect(scrape).toContain("bumblebee_metric_h_count 1")
})

test('test summary', () => {
    const metricName = "metric_s"
    const metricHelp = "help"

    const summary = prom.summary(metricName, metricHelp)
    summary.observe(99)

    const scrape = prom.scrape()
    expect(scrape).toContain("bumblebee_metric_s_sum 99")
    expect(scrape).toContain("bumblebee_metric_s_count 1")
})

test('no duplicate metric', () => {
    const metricName = "dup_metric"
    const metricHelp = "help"

    const counter = prom.counter(metricName, metricHelp)
    counter.inc(1)
    expect(() => { prom.counter(metricName, metricHelp) }).toThrow()
});
