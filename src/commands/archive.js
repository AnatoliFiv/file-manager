import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { INVALID_INPUT, OPERATION_FAILED } from "../constants/index.js";
import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';
import { getDestinationPath } from '../utils/index.js';

const createCompressionHandler = (transformFn, getFileName, logMsg) => async (args) => {
    if (args.length !== 2) throw new Error(INVALID_INPUT);

    const source = resolve(args[0]);
    const dest = await getDestinationPath(source, resolve(args[1]), getFileName);

    try {
        const stats = await stat(source);
        if (!stats.isFile()) throw new Error(OPERATION_FAILED);

        await pipeline(createReadStream(source), transformFn(), createWriteStream(dest));

        console.log(`${logMsg}: ${source} --→ ${dest}`);
    } catch (err) {
        throw new Error(OPERATION_FAILED);
    }
};

export const compress = createCompressionHandler(
    createBrotliCompress,
    (name) => `${name}.br`,
    'Compressed'
);

export const decompress = createCompressionHandler(
    createBrotliDecompress,
    (name) => name.endsWith('.br') ? name.slice(0, -3) : name,
    'Decompressed'
);
