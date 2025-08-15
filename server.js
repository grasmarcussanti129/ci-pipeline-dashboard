const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/api/status', (req, res) => {
    // Simulated status data
    const pipelineStatus = [{
        name: 'Pipeline 1',
        status: 'Success',
        lastRun: '2023-10-01 12:00'
    }, {
        name: 'Pipeline 2',
        status: 'Failed',
        lastRun: '2023-10-01 11:00'
    }];
    res.json(pipelineStatus);
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
