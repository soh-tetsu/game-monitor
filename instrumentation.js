/*instrumentation.js*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter, } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";

const OTEL_HTTP_HOST = process.env.OTEL_HTTP_HOST || "localhost";
const OTEL_HTTP_PORT = process.env.OTEL_HTTP_PORT || "4318";

console.log(`otel collector url: http://${OTEL_HTTP_HOST}:${OTEL_HTTP_PORT}`);

// const consoleExporter = new ConsoleSpanExporter();
const otlpTraceExporter = new OTLPTraceExporter({
      url: `http://${OTEL_HTTP_HOST}:${OTEL_HTTP_PORT}/v1/traces`
});
const otlpMetricsExporter = new OTLPMetricExporter({
      url: `http://${OTEL_HTTP_HOST}:${OTEL_HTTP_PORT}/v1/metrics`
});

const sdk = new NodeSDK({
    serviceName: "game-monitor",
    traceExporter: otlpTraceExporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: otlpMetricsExporter,
    }),
    instrumentations: [
        // getNodeAutoInstrumentations()
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
    ]
});

sdk.start()
