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