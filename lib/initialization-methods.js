/*
 * Signature: fn(X, K, m, n)
 *   X (2D Array): All observations (m by n)
 *   K (Integer):  Number of centroids to be initialized
 *   m (Integer):  Number of examples
 *   n (Integer):  Number of features
 */

var initializationMethods = {
    forgy: function(X, K, m, n){
        var cents = [];
        while(K--)
            cents[cents.length] = X[(Math.random() * m)|0];

        return cents;
    },
    
    
};
