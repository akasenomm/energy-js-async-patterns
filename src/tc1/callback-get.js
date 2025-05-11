const http = require('http');
const { createGETRequestConfiguration, sleep, readResponse, cleanup, runMultipleTest } = require('../common');

function callbackGET(callback) {
    const req = http.request(createGETRequestConfiguration(), async res => {
        try {
            await sleep(150);
            await readResponse(res);
            callback();
        } catch (error) {
            console.error('Error processing response:', error);
            callback();
        }
    });
    
    req.on('error', (error) => {
        console.error('Request error:', error);
        callback();
    });
    
    req.end();
}

async function main() {
    try {
        await cleanup();
        await runMultipleTest(callbackGET);
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
