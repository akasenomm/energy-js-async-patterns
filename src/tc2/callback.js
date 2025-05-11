const fs = require('fs');
const { sleep, cleanup, runMultipleTest } = require('../common');

function callbackFileWrite(callback) {
    const logContent = "Test mock data: " + new Date().toISOString() + "\n".repeat(1024);
    
    fs.writeFile('./logs/error.log', logContent, async (err) => {
        try {
            if (err) {
                console.error('Error writing file:', err);
                callback();
                return;
            }
            await sleep(150);
            callback();
        } catch (error) {
            console.error('Error in file operation:', error);
            callback();
        }
    });
}

async function main() {
    try {
        await cleanup();
        await runMultipleTest(callbackFileWrite);
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
