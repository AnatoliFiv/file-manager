import * as navigation from './navigation.js';
import * as files from './files.js';
import * as os from './os.js';
import * as hash from './hash.js';
import * as archive from './archive.js';

export const commands = {
    ...navigation,
    ...files,
    ...os,
    ...hash,
    ...archive,
};
