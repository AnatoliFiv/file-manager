import { INVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';

export function handleError(err) {
    if (err.message === INVALID_INPUT) {
        console.log(INVALID_INPUT);
    } else {
        console.log(OPERATION_FAILED);
    }
}
