/**
  * get distance between two points squared
  * @return {number} distance squared
*/
function getDistance(x1, y1, x2, y2){ 
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}
/**
 *  given point p and array of points a, finds index of closest point of a to p
 *  @param {Number} x x coordinate of point p
 *  @param {Number} y y coordinate of point p
 *  @param {Number} points array of objects of form {x: val_1, y: val_2}
 *  @return {Number} index of closest point
 */
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
/**
 * removes data below threshhold(threhold should probably be passed to it)
 * @param {Object} of form {max: val_1, data: [{counter: val_2}, {counter....]}
 * @return {Object} of same form as above but with some data removed
 */
function pruneDataSet(dataSet){
	const removeThreshold = dataSet.max/10;
	var returnDataSet = dataSet;
	var counter = returnDataSet.data.length;
	while(counter--){
		if(returnDataSet.data[counter] < removeThreshold){
			returnDataSet.data.splice(counter, 1);
		}
	}

	return returnDataSet;
}
/**
 * finds best locations to maxamize vals 
 * @param {Number} nLocations number of locations to find/number of centroids
 * @param {Object} of form {max: val_1, data: [{lat: val_2, lng: val_3, counter: val_2},.. 
 * @return {Array} of objects, each object of form {x: val_1, y: val_2}
 */ 
function findBestLocation(nLocations, dataSet){
    dataSet = pruneDataSet(dataSet);
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
		let weightSumPerCentroid = [];
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
				weightSumPerCentroid[closestCentroidIndex[i]] = 0;
            }
			let weight = Math.pow(dataSet.data[i].count / dataSet.max, 3);
			weightSumPerCentroid[closestCentroidIndex[i]] += weight; 
	    	xSumPerCentroid[closestCentroidIndex[i]] += (dataSet.data[i].lat * weight);
            ySumPerCentroid[closestCentroidIndex[i]] += (dataSet.data[i].lng * weight);
            nElementsPerCentroid[closestCentroidIndex[i]]++;
		}
	
        /* computes new centroids based off of data elements assigned to centroid */
		for(let i = 0; i < centroids.length; i++){
            centroids[i].x = (1 / weightSumPerCentroid[i]) * xSumPerCentroid[i];
            centroids[i].y = (1 / weightSumPerCentroid[i]) * ySumPerCentroid[i];
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
//

if(typeof exports !== 'undefined') {
    exports.findBestLocation = findBestLocation;
    exports.getDistance = getDistance;
    exports.getClosestPointIndex = getClosestPointIndex;
    exports.pruneDataSet = pruneDataSet;
}

