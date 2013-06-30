var Clustering = function Clustering(options) {
    options || (options = {});

    var tmp;

    this.K                  = (tmp = options.K)                 != null ? tmp : 5;
    this.iterations         = (tmp = options.itrations)         != null ? tmp : 100;
    this.convergenceTest    = (tmp = options.convergenceTest)   != null ? tmp : true;
    this.tolerance          = (tmp = options.tolerance)         != null ? tmp : 1e-9;

    this.initialize         = (tmp = options.initialize)        != null ? tmp : initializationMethods.forgy;
    this.distanceMetric     = (tmp = options.distanceMetric)    != null ? tmp : distanceMetrics.euclidianSquared;
}

Clustering.prototype.cluster = function culster(X) {
    
}

Clustering.prototype.hasConverged = function hasConverged() {}

/*Clustering.prototype.minIndex = function minIndex(arr) {
    var minI = 0
      , minV = Infinity
      ,    N = arr.length;

    while (N--) {
        if (arr[N] < minV) {
            minV = arr[N];
            minI = N;
        }
    }

    return minI;
}

Clustering.prototype.maxIndex = function maxIndex(arr) {
    var maxI = 0
      , maxV = -Infinity
      ,    N = arr.length;

    while (N--) {
        if (arr[N] > maxV) {
            maxV = arr[N];
            maxI = N;
        }
    }

    return maxI;
}*/

Clustering.prototype.copy2DArray = function copy2DArray(arr) {
    var N = arr.length
      , retArr = Array(N)

    while (N--)
        retArr[N] = arr[N].slice();

    return retArr;
}
