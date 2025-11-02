import { stat } from 'node:fs/promises';
import { join, basename } from 'node:path';

export async function getDestinationPath(sourcePath, destPath, getFileName) {
    try {
        const destStat = await stat(destPath);
        return destStat.isDirectory() ? join(destPath, getFileName(basename(sourcePath))) : destPath;
    } catch {
        return destPath;
    }
}
