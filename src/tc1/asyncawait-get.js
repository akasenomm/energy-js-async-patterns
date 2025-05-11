const http = require('http');
const { createGETRequestConfiguration, sleep, readResponse, cleanup, runMultipleTest } = require('../common');

async function asyncAwaitGET() {
    return new Promise((resolve, reject) => {
        const req = http.request(createGETRequestConfiguration(), async res => {
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
        
        req.end();
    });
}

async function main() {
    try {
        await cleanup();
        await runMultipleTest(async callback => {
            try {
                await asyncAwaitGET();
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
