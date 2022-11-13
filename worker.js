const http = require('http');
const pid = process.pid;
const port = 8000;

const server = http.createServer((req, res) => {
    res.end('Hello from Node! \n');
}).listen(port, () => {
    console.log(`Worker started with process ID: ${pid}`)
});

// killing with Ctrl + C in terminal (example)
process.on('SIGINT', () => {
    server.close(() => {
        process.exit(0);
    })
});

// killing with 'kill' command
process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    })
});

// hard reboot by user signal
process.on('SIGUSR2', () => {
    server.close(() => {
        process.exit(1);
    })
});