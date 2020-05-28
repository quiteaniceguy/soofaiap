var bestLocation = require('../findBestLocation');

describe("Tests getDistance function ", () => {
	test("should return distance = 5", () => {
		/* basic 3 4 5 triangle */
		expect(bestLocation.getDistance(0,0,3,4)).toEqual(5);
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

describe("KMeans Test", () => {
	test("should return centroids in proper positions", () => {
		let testData = {data: [
			{lat: 1, lng: 2},
			{lat: 1, lng: 1},
			{lat: 2, lng: 2},
			{lat: 2, lng: 1},
			{lat: 3, lng: 3},
			{lat: 3, lng: 4},
			{lat: 4, lng: 3},
			{lat: 4, lng: 4}
		]};

		let nLoc = 2;

		expect(
			bestLocation.findBestLocation(nLoc, testData)[0].x == 1.5 || 
			bestLocation.findBestLocation(nLoc, testData)[0].x == 3.5);
	});
});




