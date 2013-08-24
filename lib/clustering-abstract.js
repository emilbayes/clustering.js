(function(undefined){
    'use strict';

    this.ClusteringAbstract = function(options) {
        if(options === undefined)
            options = {};

        var tmp;

        this.K                  = (tmp = options.K)                 !== undefined ? tmp : 5;
        this.maxIterations      = (tmp = options.maxIterations)     !== undefined ? tmp : 100;
        this.convergenceTest    = (tmp = options.convergenceTest)   !== undefined ? tmp : true;
        this.tolerance          = (tmp = options.tolerance)         !== undefined ? tmp : 1e-9;

        this.initialize         = (tmp = options.initialize)        !== undefined ? tmp : Clustering.InitializationMethods.Forgy;
        this.distanceMetric     = (tmp = options.distanceMetric)    !== undefined ? tmp : Clustering.DistanceMetrics.EuclidianSquared;
    };

    this.ClusteringAbstract.prototype = {
        cluster: function(X) {},
        hasConverged: function() {},
        copy2DArray: function(arr) {
            var N = arr.length,
                retArr = new Array(N);

            while (N--)
                retArr[N] = arr[N].slice();

            return retArr;
        }
    };

    /*ClusteringAbstract.prototype.minIndex = function minIndex(arr) {
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

    ClusteringAbstract.prototype.maxIndex = function maxIndex(arr) {
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
    
}).call(Clustering);
