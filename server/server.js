const express = require('express');
const app = express();
const port = 4000;
const { mockPayload } = require('../mock-data');

const timestamp = () => `[${new Date().toISOString()}]`;

app.use(express.json({ limit: '5mb' }));

app.use((req, res, next) => {
  console.log(`${timestamp()} Request: ${req.method} ${req.url}`);
  next();
});

app.get('/test', (req, res, next) => {
    try {
        console.log(`${timestamp()} GET /test success`);
        res.json(mockPayload);
    } catch (error) {
        console.error(`${timestamp()} GET /test failed:`, error.message);
        next(error);
    }
});

app.post('/test', (req, res, next) => {
    try {
        if (!req.body) {
            console.error(`${timestamp()} POST /test failed: No data received`);
            return res.status(400).json({
                status: 'error',
                message: 'No data received'
            });
        }
        console.log(`${timestamp()} POST /test success`);
        res.json({
            status: 'success',
            message: 'Payload received'
        });
    } catch (error) {
        console.error(`${timestamp()} POST /test failed:`, error.message);
        next(error);
    }
});

app.use((error, req, res) => {
    console.error(`${timestamp()} Route error:`, error);
    res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(port, () => {
    console.log(`${timestamp()} Express server listening at http://localhost:${port}`);
});

server.on('error', err => {
    console.error(`${timestamp()} Server startup error:`, err);
    process.exit(1);
});
