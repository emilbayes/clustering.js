;(function(undefined){
    'use strict';

    function extend(target) {
        var i = 0,
            args = [].slice.call(arguments, 1),
            _len = args.length,
            _curObj;

        for(; i < _len; i++) {
            _curObj = args[i];
            if(_curObj) {
                for(var prop in _curObj) {
                    target[prop] = _curObj[prop];
                }
            }
        }

        return target;
    }

    function inherit(parent, protoProps) {
        var child; 

        if(protoProps && hasOwnProperty.call(protoProps, 'constructor')) {
            child = protoProp.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        extend(child, parent);

        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        if(protoProps) extend(child.prototype, protoProps);

        child.__super__ = parent.prototype;

        return child;
    }


    this.Clustering = {
        _extend: extend,
        _inherit: inherit
    };

}).call(typeof window !== undefined ? window : module.exports);
(function(undefined){
    'use strict';
    /**
     *   Optimisations:
     *
     *       * `Math.abs` is faster as `n < 0 ? -n : n`;
     *       * `for` loops are faster as `while (i--)`
     */
    this.DistanceMetrics = {
        /*minkowski: function(X, Y, p) {
            var sum = 0
              , n   = X.length
              , tmp, val
              , pow = Math.pow;

            while (n--) {
                sum += pow(
                    (tmp = Y[n] - X[n]) < 0 ? -tmp : tmp //Micro optimisation
                    , p
                );
            }

            return pow(sum, 1/p)
        },*/

        Manhattan: function(X, Y) {
            var sum = 0,
                n   = X.length,
                tmp;

            while (n--)
                sum += (tmp = Y[n] - X[n]) < 0 ? -tmp : tmp; //Micro optimisation

            return sum;
        },

        Euclidian: function (X, Y) {
            var sum = 0,
                n   = X.length;

            while (n--)
                sum += (Y[n] - X[n]) * (Y[n] - X[n]);

            return Math.sqrt(sum);
        },

        EuclidianSquared: function (X, Y) {
            var sum = 0,
                n   = X.length;

            while (n--)
                sum += (Y[n] - X[n]) * (Y[n] - X[n]);

            return sum;
        }
    };
}).call(Clustering);
;(function(undefined){
    'use strict';

    /*
     * Signature: fn(X, K, m, n)
     *   X (2D Array): All observations (m by n)
     *   K (Integer):  Number of centroids to be initialized
     *   m (Integer):  Number of examples
     *   n (Integer):  Number of features
     *
     * Return array of size K by n
     *
     */

    this.InitializationMethods = {
        /*
         * Will choose K random datapoints from X as the initial centroids
         */
        Forgy: function(X, K, m, n) {
            var cents = [];

            while(K--)
                cents[cents.length] = X[(Math.random() * m)|0];

            return cents;
        },

        //http://vldb.org/pvldb/vol5/p622_bahmanbahmani_vldb2012.pdf
        Kpp: function(X, K, m, n) {
            var cents = [],
                sum;

            cents[cents.length] = X[(Math.random() * m)|0];
            while(--K) { //pre-decrement since one centroid is already chosen
                sum = 0;



            }

            return cents;
        },

        Kll: function(X, K, m, n) {

        }
    };


    /*function resample(X, w, wMax) {
        var idx;
        
        if(wMax === undefined) wMax = Math.max.apply(Math, w);
        while(w[idx = Math.random()*w.length|0] > Math.random()*wMax)
    }*/
}).call(Clustering);
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

;(function(undefined){
    'use strict';

    /*

    BUGS ALL OVER

    this.clusters is a mapping of this.X in relation to this.centroids
    //////*/


    function noop() {}

    this.KMeans = Clustering._inherit(Clustering.ClusteringAbstract, {

        cluster: function(X, onIterationDone, onComplete) {
            var convergence;
            
            this.X = X;
            this.clusters = [];

            this._prevCentroids = [];

            this.m = X.length;
            this.n = X[0].length;

            if(this.m === undefined || this.n === undefined || this.m < this.K || this.n < 1)
                throw 'Incorrect data';

            this.centroids = this.initialize(this.X, this.K, this.m, this.n);






            if(onIterationDone === undefined) onIterationDone = noop;
            if(onComplete === undefined) onComplete = noop;


            this.iteration = 0;
            
            while(this.iteration++ < this.maxIterations) {
                convergence = this.findClosestCentroids()
                    .moveCentroids()
                    .hasConverged();

                onIterationDone.call(this);

                if(convergence) {
                    onComplete.call(this);
                    break;
                }
            }

            return this; //chaining
        },
        hasConverged: function() {
            if(!this.convergenceTest)
                return false;

            if(this.iteration == this.maxIterations)
                return true;

            //if any of the centroids have moved more than the tolerance
            // then the algorithm has yet to converge
            for(var i = 0; i < this.K; i++)
                if(this.tolerance < this.distanceMetric(this._prevCentroids[i], 
                                                        this.centroids[i]))
                    return false;

            //All centroids moved less than the tolerance, ie. hasConverged() === true
            return true;
        },
        findClosestCentroids: function() {
            var i,
                j, 
                minIndex, 
                minVal, 
                tmpMin;

            if(this.convergenceTest)
                this._prevCentroids = this.copy2DArray(this.centroids);

            this.clusters = [];
            for (i = this.K - 1; i >= 0; i--)
                this.clusters[i] = [];

            i = this.m - 1;
            while(i--) { //for each datapoint
                minIndex = 0;
                minVal = Infinity;

                j = this.K;

                while(j--) { //Find centroid closest to datapoint
                    tmpMin = this.distanceMetric(this.centroids[j], this.X[i]);

                    if(tmpMin < minVal) {
                        minIndex = j;
                        minVal = tmpMin;
                    }
                }

                this.clusters[minIndex].push(i);
            }

            return this; //chaining
        },
        moveCentroids: function() {
            var i = this.K - 1, 
                j, 
                k, 
                sum, 
                curCl;

            while(i--) { //for each cluster
                curCl = this.clusters[i];
                if(curCl.length < 1) //Avoid division by 0
                    continue;

                j = this.n - 1;
                while(j--) {
                    sum = 0;
                    k = curCl.length - 1;
                    while(k--)
                        sum += this.X[curCl[k]][j];

                    //Move centroid by the mean of it's cluster
                    this.centroids[i][j] = sum/curCl.length;
                }
            }

            return this; //chaining
        }
    });



}).call(Clustering);