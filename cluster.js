const cluster = require('cluster');
const os = require('os');
const pid = process.pid;
const port = 8000;

if (cluster.isMaster) {
    const cpuCount = os.cpus().length;
    console.log(`CPUs: ${cpuCount}`);
    console.log(`Master started at port ${port}. Process ID: ${pid}`);
    for(let i = 0; i < cpuCount - 1; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, exitCode)=>{
        console.log(`Worker with PID ${worker.process.pid} died with code ${exitCode}`);
        if(exitCode===1){
            cluster.fork();
        }
    })
}

if (cluster.isWorker) {
    require('./worker.js');
}