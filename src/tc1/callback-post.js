const http = require('http');
const { createPOSTRequestConfiguration, mockPayloadString, sleep, readResponse, cleanup, runMultipleTest } = require('../common');

function callbackPOST(callback) {
    const req = http.request(createPOSTRequestConfiguration(), async res => {
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

    req.write(mockPayloadString);
    req.end();
}

async function main() {
    try {
        await cleanup();
        await runMultipleTest(callbackPOST);
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