const { exec } = require('child_process');

const commands = [
    "rm start.log",
    "node stop.js >> start.log && echo OK",
    "./network.sh up createChannel -ca >> start.log && echo OK",
    "cd addOrg3 && ./addOrg3.sh up -ca >> start.log && echo OK",
    "./network.sh deployCC -ccn ComprehensiveSmartContract -ccp ./chaincode -ccl javascript >> start.log && echo OK",
    "cd application && npm i >> ../start.log && echo OK",
    // 'cd application && npx kill-port 3000 >> ../stop.log && echo "Application is down..."',
    "cd application && npm start >> ../start.log &",
];

const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                // console.error(`Error executing command: ${command}\n${error.message}`);
                resolve(error);
            } else {
                // console.log(`Command executed: ${command}`);
                resolve(stdout);
            }
        });
    });
}

const executeCommandsSequentially = async (commands) => {
    try {
        let index = 1
        for (const command of commands) {
            if (index == commands.length) {
                console.log(`Executing: ${command}`);
                exec(command);
            } else {
                console.log(`Executing: ${command}`);
                await executeCommand(command);
            }
            index++;
        }

        console.log('All commands executed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error executing commands:', error);
    }
}

executeCommandsSequentially(commands);
