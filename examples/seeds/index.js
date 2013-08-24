var fs = require('fs'),
    clustering = require('../../index.js')

fs.readFile(__dirname+'/seeds_dataset.tsv', function (err, contents) {
    var data = contents.toString()
    .split('\n')
    .map(function(line){
        return line
        .split('\t')
        .map(function(field){
            return parseFloat(field || 0);
        });
    });

    var km = Clustering.kMeans({K:3});
    km.cluster(data);

    console.log(km.centroids, km.clusters);
    
});
