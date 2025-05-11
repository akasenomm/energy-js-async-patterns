const fs = require('fs');
const { sleep, cleanup, runMultipleTest } = require('../common');

function promiseFileWrite() {
    const logContent = "Test mock data: " + new Date().toISOString() + "\n".repeat(1024);
    
    return new Promise((resolve, reject) => {
        fs.writeFile('./logs/error.log', logContent, async (err) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                await sleep(150);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
}

async function main() {
    try {
        await cleanup();
        await runMultipleTest(callback => {
            promiseFileWrite()
                .then(() => callback())
                .catch(error => {
                    console.error('Promise error:', error);
                    callback();
                });
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
