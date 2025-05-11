const http = require('http');
const { createPOSTRequestConfiguration, mockPayloadString, sleep, readResponse, cleanup, runMultipleTest } = require('../common');

async function asyncAwaitPOST() {
    return new Promise((resolve, reject) => {
        const req = http.request(createPOSTRequestConfiguration(), async res => {
            try {
                await sleep(150);
                await readResponse(res);
                resolve();
            } catch (error) {
                console.error('Error processing response:', error);
                reject(error);
            }
        });

        req.on('error', (error) => {
            console.error('Request error:', error);
            reject(error);
        });

        req.write(mockPayloadString);
        req.end();
    });
}

async function main() {
    try {
        await cleanup();
        await runMultipleTest(async callback => {
            try {
                await asyncAwaitPOST();
                callback();
            } catch (error) {
                console.error('Async operation error:', error);
                callback();
            }
        });
        console.log('Tests completed successfully');
    } catch (error) {
        console.error('Error during test execution:', error);
        process.exit(1);
    }
}

main().catch(error => {
    console.error('Unhandled error in main:', error);
    process.exit(1);
});