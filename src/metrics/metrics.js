const promClient = require('prom-client');

// collect default metrics
promClient.collectDefaultMetrics();

const getMetrics = async () => {
    return promClient.register.metrics();
};

module.exports = {
    getMetrics,
    contentType: promClient.register.contentType
};
