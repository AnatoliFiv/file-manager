export function getUsernameFromArgs(argv) {
    const usernameArg = argv.find(arg => arg.startsWith('--username='));
    if (!usernameArg) return null;
    return usernameArg.split('=')[1];
}
