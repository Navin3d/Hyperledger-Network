const { exec } = require('child_process');

const commands = [
    "rm init.log",
    "node stop.js >> init.log && echo OK",
    "rm -r bin && rm -r config && rm -r builders >> init.log && echo OK",
    "sudo ./install-fabric.sh b >> init.log && echo OK",
];

// for(const command of commands) 
//     exec(command);

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

        for (const command of commands) {
            console.log(`Executing: ${command}`);
            await executeCommand(command);
        }

        console.log('All commands executed successfully.');
    } catch (error) {
        // console.error('Error executing commands:', error);
    }
}

executeCommandsSequentially(commands);