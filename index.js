const { Worker } = require('worker_threads');
const request = require("request");

function startWorker(path, cb) {
	let w = new Worker(path, {workerData: null});
	w.on('message', (msg) => {
		cb(null, msg)
	})
	w.on('error', cb);
	w.on('exit', (code) => {
		if(code != 0)
	      	console.error(new Error(`Worker stopped with exit code ${code}`))
   });
	return w;
}

setInterval(() => {
    startWorker(__dirname + '/worker.js', (err, result) => {
        if(err) return console.error(err);
        console.log("---------------")
        console.log("Worker finished, Took: ", (result.timeDiff / 1000), " seconds");
        console.log("---------------")
    })
}, 3000)

setInterval(() => {
    const requestStartDate = Date.now();
    request.get('http://www.google.com', (err, resp) => {
        if(err) {
            return console.error(err);
        }
        const timeDiff = (Date.now() - requestStartDate) / 1000;
        console.log("Request finished, Took: ", timeDiff);
    }) 
}, 1000);
