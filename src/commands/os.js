import nodeOs from 'node:os';
import { INVALID_INPUT, OPERATION_FAILED } from "../constants/index.js";

export const os = async (args) => {
    if (args.length !== 1 || !args[0].startsWith('--')) throw new Error(INVALID_INPUT);

    const subArs = args[0].slice(2);

    switch (subArs) {
        case 'EOL': console.log(JSON.stringify(nodeOs.EOL)); break;
        case 'cpus':
            const cpus = nodeOs.cpus();
            console.log(`Overall amount of CPUs: ${cpus.length}`);
            console.table(cpus.map(c => ({ Model: c.model, 'Clock Rate (GHz)': c.speed / 1000 + ' GHz' })));
            break;
        case 'homedir': console.log(nodeOs.homedir()); break;
        case 'username':
            try {
                console.log(nodeOs.userInfo().username);
            } catch {
                throw new Error(OPERATION_FAILED);
            }
            break;
        case 'architecture': console.log(process.arch); break;
        default: throw new Error(INVALID_INPUT);
    }
};
