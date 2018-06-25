const {  parentPort } = require('worker_threads');

function random(min, max) {
	return Math.random() * (max - min) + min
}

const start = Date.now()
let bigList = Array(50000000).fill().map( (_) => random(1,10000))


parentPort.postMessage({ val: bigList.length, timeDiff: Date.now() - start});
