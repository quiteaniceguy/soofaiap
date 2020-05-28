function getDistance(x1, y1, x2, y2){ 
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
function getClosestPointIndex(x, y, points){	
	let closestIndex = 0;	
	minDist = getDistance(points[0].x, points[0].y, x, y);
	for(let i = 1; i < points.length; i++){
		dist = getDistance(points[i].x, points[i].y, x, y);
		if(dist < minDist){
			closestIndex = i;
			minDist = dist;
		}
	} 
	return closestIndex;
}
function findBestLocation(nLocations, dataSet){
    var maxLoops = 50;
    var currentLoops = 0;
	var centroids = [];
	var lastClosestCentroidIndex = [];
 
	//initialize centroids as random elements in data set
	for(let i = 0; i < nLocations; i++){
		let randNum = Math.floor(Math.random() * dataSet.data.length);
		centroids.push({
			x: dataSet.data[randNum].lat,
			y: dataSet.data[randNum].lng
		});
	}
    console.log("after init centroids");
    console.log(centroids);

	while(true){
		let closestCentroidIndex = [];
		//all of length nCentroids
		let xSumPerCentroid = [];
		let ySumPerCentroid = [];
		let nElementsPerCentroid = [];

		/* classifies closest centroid to each data element */ 
		for(let i = 0; i < dataSet.data.length; i++){
			closestCentroidIndex[i] = getClosestPointIndex(
				dataSet.data[i].lat,
				dataSet.data[i].lng,
				centroids
			);
            /* keeps running total of x, y values and elements per centroid for computing new centroid */
            if(xSumPerCentroid[closestCentroidIndex[i]] == undefined){
                xSumPerCentroid[closestCentroidIndex[i]] = 0;
                ySumPerCentroid[closestCentroidIndex[i]] = 0;
                nElementsPerCentroid[closestCentroidIndex[i]] = 0;
            }
			xSumPerCentroid[closestCentroidIndex[i]] += dataSet.data[i].lat;
            ySumPerCentroid[closestCentroidIndex[i]] += dataSet.data[i].lng;
            nElementsPerCentroid[closestCentroidIndex[i]]++;
		}
	
        /* computes new centroids based off of data elements assigned to centroid */
		for(let i = 0; i < centroids.length; i++){
            centroids[i].x = xSumPerCentroid[i]/nElementsPerCentroid[i];
            centroids[i].y = ySumPerCentroid[i]/nElementsPerCentroid[i];
        }
 
	 	if(JSON.stringify(lastClosestCentroidIndex) == JSON.stringify(closestCentroidIndex)){
            console.log("finish normally");
            console.log(centroids);
            break;	
        }
        if(currentLoops++ > maxLoops){
            console.log("max reached");
            console.log(centroids);
            break;
        }
        lastClosestCentroidIndex = closestCentroidIndex;
	}
    return centroids
	
}

//allows testing using node and use in browser
if(typeof exports !== 'undefined') {
	exports.findBestLocation = findBestLocation;
	exports.getDistance = getDistance;
    exports.getClosestPointIndex = getClosestPointIndex;
}

