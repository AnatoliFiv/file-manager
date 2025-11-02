import os from 'node:os';
import readline from 'node:readline';
import { INVALID_INPUT } from './constants/index.js';

import { commands } from "./commands/index.js";
import { getUsernameFromArgs, handleError, printCwd, sayGoodbye } from "./utils/index.js";


const username = getUsernameFromArgs(process.argv);
if (!username) {
    console.error(`${INVALID_INPUT}: Please run with --username=your_username`);
    process.exit(1);
}

process.chdir(os.homedir());
console.log(`Welcome to the File Manager, ${username}!`);
printCwd();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});


rl.on('line', async (input) => {
    const args = input.trim().split(/\s+/);
    const cmd = args[0];

    if (cmd === '.exit') {
        rl.close();
        return;
    }

    if (commands[cmd]) {
        try {
            await commands[cmd](args.slice(1));
        } catch (err) {
            handleError(err);
        }
    } else {
        console.log(INVALID_INPUT);
    }

    printCwd();
    rl.prompt();
});


rl.on('close', () => sayGoodbye(username));

process.on('SIGINT', () => {
    rl.close();
});


rl.prompt();
