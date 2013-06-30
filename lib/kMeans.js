/*

BUG ALL OVER

this.clusters is a mapping of this.X in relation to this.centroids
//////*/



function noop() {}

kMeans.prototype = new Clustering();
kMeans.prototype.constructor = kMeans;

function kMeans(options) {
    return Clustering.call(this, options);
}

kMeans.prototype.cluster = function(X, onIterationDone, onComplete) {
    this.X = X;
    this.clusters = [];

    this._prevCentroids = [];

    this.m = X.length;
    this.n = X[0].length;

    if(this.m == null || this.n == null || this.m < this.K || this.n < 1)
        throw 'Incorrect data';

    this.centroids = this.initialize(this.X, this.K, this.m, this.n);






    if(onIterationDone == undefined) onIterationDone = noop;
    if(onComplete == undefined) onComplete = noop;


    var _currentIteration = 0
      , convergence;

    while(_currentIteration++ < this.iterations) {
        convergence = this.findClosestCentroids()
            .moveCentroids()
            .hasConverged();

        onIterationDone();

        if(convergence) {
            onComplete();
            break;
        }
    }

    return this; //chaining
}

kMeans.prototype.hasConverged = function() {
    if(!this.convergenceTest)
        return false;

    //if any of the centroids have moved more than the tolerance
    // then the algorithm has yet to converge
    for(var i = 0; i < this.K; i++)
        if(this.tolerance < this.distanceMetric(this._prevCentroids[i], 
                                                this.centroids[i]))
            return false;

    //All centroids moved less than the tolerance, ie. hasConverged() === true
    return true;
}

kMeans.prototype.findClosestCentroids = function() {
    if(this.convergenceTest)
        this._prevCentroids = this.copy2DArray(this.centroids);

    this.clusters = [];
    for (var i = this.K - 1; i >= 0; i--)
        this.clusters[i] = [];

    var i = this.m - 1
      , j, minIndex, minVal, tmpMin;

    while(i--) { //for each datapoint
        minIndex = 0;
        minVal = Infinity;

        j = this.K - 1;
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
}

kMeans.prototype.moveCentroids = function() {
    var i = this.K - 1
      , j, k, sum, curCl;

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


