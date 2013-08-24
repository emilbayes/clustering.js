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