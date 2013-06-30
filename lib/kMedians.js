kMedians.prototype = new kMeans();
kMedians.prototype.constructor = kMedians;

function kMedians(options) {
    return kMeans.call(this, options);
}

kMedians.prototype.moveCentroids = function() {
    var i = this.K - 1
      , X = this.X //cache
      , j, half, median, curCl;

    while(i--) { //for each cluster
        curCl = this.clusters[i]; //cache

        if(curCl.length < 1) { //Avoid division by 0
            continue;
        }

        j = this.n - 1;
        while(j--) {

            curCl.sort(function(a, b){
                return X[b][j] - X[a][j];
            }.bind(this));
             
                half = (curCl.length) >> 1; // |0 is a bitwise floor
                if(curCl.length & 1) //bitwise mod 2
                    median = X[curCl[half]][j];
                else
                    median = (X[curCl[half-1]][j] + X[curCl[half]][j])/2;

            //Move centroid by the median of it's cluster per dimension
            this.centroids[i][j] = median;
        }
    }


    return this;
}
