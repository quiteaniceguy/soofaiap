var bestLocation = require('../findBestLocation');

describe("Tests getDistance function ", () => {
	test("should return distance = 25(because it returns distance squared)", () => {
		/* basic 3 4 5 triangle */
		expect(bestLocation.getDistance(0,0,3,4)).toEqual(25);
	});
});

describe("Tests getClosestPointIndex function ", () => {
	test("should return index of closest point", () => {
		/* easily verifiable because all points on straight line */
		let points = [
			{x: 2, y: 2},
			{x: 3, y: 3},
			{x: 1, y: 1},
			{x: 4, y: 4}
		];

		let x1 = 0;
		let y1 = 0;
		expect(bestLocation.getClosestPointIndex(x1, y1, points)).toEqual(2);
		let x2 = 5;
		let y2 = 5;
		expect(bestLocation.getClosestPointIndex(x2, y2, points)).toEqual(3);

	});
});

describe("Prune data set test", () => {
	test("should return dataSet with only one element", () => {
		let testData = {max: 10, data: [
			{count: 0},
			{count: 0},
			{count: 0},
			{count: 5},
			{count: 0},
			{count: 0}
		]};
		expect(bestLocation.pruneDataSet(testData).data.length == 1);
	});

});
describe("KMeans Test", () => {
	test("should return centroids in proper positions", () => {
		let testData = {max: 1, data: [
			{lat: 1, lng: 2, count: .5},
			{lat: 1, lng: 1, count: .5},
			{lat: 2, lng: 2, count: .5},
			{lat: 2, lng: 1, count: .5},
			{lat: 3, lng: 3, count: .5},
			{lat: 3, lng: 4, count: .5},
			{lat: 4, lng: 3, count: .5},
			{lat: 4, lng: 4, count: .5}
		]};
		let testData_2 = {max: 1, data: [
			{lat: 1, lng: 2, count: .5},
			{lat: 1, lng: 1, count: 1},
			{lat: 2, lng: 2, count: .5},
			{lat: 2, lng: 1, count: .5},
			{lat: 3, lng: 3, count: .5},
			{lat: 3, lng: 4, count: .5},
			{lat: 4, lng: 3, count: .5},
			{lat: 4, lng: 4, count: .5}
		]};

		let nLoc = 2;

		expect(
			bestLocation.findBestLocation(nLoc, testData)[0].x == 1.5 || 
			bestLocation.findBestLocation(nLoc, testData)[0].x == 3.5);
		expect(
			bestLocation.findBestLocation(nLoc, testData_2)[0].x < 1.5 ||
			bestLocation.findBestLocation(nLoc, testData_2)[1].x < 1.5);
	});
});




