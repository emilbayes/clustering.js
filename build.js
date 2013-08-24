var Queue = require('gear').Queue;
var Registry = require('gear').Registry;

new Queue({registry: new Registry({module: 'gear-lib'})})
    .read(['lib/distance-metrics.js', 'lib/initialization-methods.js', 'lib/clustering-abstract.js', 'lib/k-means.js', 'lib/k-medians.js'])
    .concat()
    .jsminify()
    .write('clustering.min.js')
    .inspect()
    .run();
