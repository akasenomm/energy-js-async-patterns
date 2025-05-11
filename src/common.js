const { mockPayloadString } = require('../mock-data');

const CONFIG = {
    server: {
        hostname: 'localhost',
        port: 4000,
        path: '/test'
    },
    gcSleepTime: 1000
};

function createGETRequestConfiguration() {
    return {
        hostname: CONFIG.server.hostname,
        port: CONFIG.server.port,
        path: CONFIG.server.path,
        method: 'GET'
    };
}

function createPOSTRequestConfiguration() {
    return {
        hostname: CONFIG.server.hostname,
        port: CONFIG.server.port,
        path: CONFIG.server.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(mockPayloadString)
        }
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function readResponse(res) {
    return new Promise((resolve, reject) => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('error', err => {
            reject(err);
        });

        res.on('end', () => {
            try {
                if (res.statusCode >= 400) {
                    reject(new Error(`HTTP Error: ${res.statusCode} ${res.statusMessage}`));
                    return;
                }
                const parsedData = JSON.parse(data);
                resolve(parsedData);
            } catch (error) {
                console.warn('Failed to parse response as JSON:', error.message);
                resolve(data);
            }
        });
    });
}

function clearRequireCache() {
    Object.keys(require.cache).forEach(key => delete require.cache[key]);
}

async function cleanup() {
    try {
        clearRequireCache();

        if (!global.gc) {
            console.warn("Garbage collection not available, skipping GC step");
            return;
        }

        global.gc();
        await sleep(CONFIG.gcSleepTime);
    } catch (error) {
        console.error("Error during cleanup:", error);
        throw error;
    }
}

function runMultipleTest(doFn) {
    const iterations = 10;
    return new Promise(resolve => {
        let completed = 0;
        for (let i = 0; i < iterations; i++) {
            doFn(() => {
                completed++;
                if (completed === iterations) {
                    resolve();
                }
            });
        }
    });
}

module.exports = {
    createGETRequestConfiguration,
    createPOSTRequestConfiguration,
    mockPayloadString,
    sleep,
    readResponse,
    cleanup,
    runMultipleTest
};