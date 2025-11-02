import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { resolve as resolvePath } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { INVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';

export const hash = async (args) => {
    if (args.length !== 1) throw new Error(INVALID_INPUT);

    const filePath = resolvePath(args[0]);

    try {
        const readableStream = createReadStream(filePath);
        const hashStream = createHash('sha256');

        await pipeline(readableStream, hashStream);

        console.log(hashStream.digest('hex'));
    } catch (error) {
        throw new Error(OPERATION_FAILED);
    }
};
