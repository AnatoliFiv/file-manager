import fs from 'node:fs/promises';
import path from 'node:path';
import { INVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';

export const up = async (args) => {
    if (args.length !== 0) throw new Error(INVALID_INPUT);

    const current = process.cwd();
    const root = path.parse(current).root;

    if (current === root) return;

    process.chdir('..');
};

export const cd = async (args) => {
    if (args.length !== 1) throw new Error(INVALID_INPUT);

    const target = path.resolve(args[0]);
    let stats;

    try {
        stats = await fs.stat(target);
    } catch {
        throw new Error(OPERATION_FAILED);
    }

    if (!stats.isDirectory()) throw new Error(OPERATION_FAILED);

    process.chdir(target);
};

export const ls = async (args) => {
    if (args.length !== 0) throw new Error(INVALID_INPUT);

    const entries = await fs.readdir(process.cwd(), { withFileTypes: true });

    const tableData = entries
        .sort((a, b) => b.isDirectory() - a.isDirectory() || a.name.localeCompare(b.name))
        .map((entry) => ({
            Name: entry.name.length > 40 ? entry.name.substring(0, 37) + '...' : entry.name,
            Type: entry.isDirectory() ? 'directory' : 'file',
        }));

    console.table(tableData);
};
