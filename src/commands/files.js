import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { INVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';

export const cat = async (args) => {
    if (args.length !== 1) throw new Error(INVALID_INPUT);

    const filePath = path.resolve(args[0]);

    try {
        await pipeline(createReadStream(filePath), process.stdout, { end: false });
        if (process.stdout.isTTY) process.stdout.write('\n');
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const add = async (args) => {
    if (args.length !== 1) throw new Error(INVALID_INPUT);

    const newFilePath = path.resolve(process.cwd(), args[0]);
    try {
        const handle = await fs.open(newFilePath, 'wx');
        await handle.close();
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const mkdir = async (args) => {
    if (args.length !== 1) throw new Error(INVALID_INPUT);

    const dirPath = path.resolve(process.cwd(), args[0]);
    try {
        await fs.mkdir(dirPath);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const rm = async (args) => {
    if (args.length !== 1) throw new Error(INVALID_INPUT);

    const target = path.resolve(args[0]);
    try {
        const stats = await fs.stat(target);
        if (!stats.isFile()) throw new Error(OPERATION_FAILED);
        await fs.unlink(target);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const rn = async (args) => {
    if (args.length !== 2) throw new Error(INVALID_INPUT);

    const [oldPath, newName] = args;
    const oldFull = path.resolve(oldPath);
    const newFull = path.join(path.dirname(oldFull), newName);

    try {
        await fs.rename(oldFull, newFull);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const cp = async (args) => {
    if (args.length !== 2) throw new Error(INVALID_INPUT);

    const [src, destDir] = args;
    const srcPath = path.resolve(src);
    const destDirPath = path.resolve(destDir);
    const destPath = path.join(destDirPath, path.basename(srcPath));

    try {
        const destStats = await fs.stat(destDirPath);
        if (!destStats.isDirectory()) throw new Error(OPERATION_FAILED);
        await pipeline(createReadStream(srcPath), createWriteStream(destPath));
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const mv = async (args) => {
    if (args.length !== 2) throw new Error(INVALID_INPUT);

    const [src, destDir] = args;
    const srcPath = path.resolve(src);
    const destDirPath = path.resolve(destDir);
    const destPath = path.join(destDirPath, path.basename(srcPath));

    try {
        const destStats = await fs.stat(destDirPath);
        if (!destStats.isDirectory()) throw new Error(OPERATION_FAILED);

        await pipeline(createReadStream(srcPath), createWriteStream(destPath));
        await fs.unlink(srcPath);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};
