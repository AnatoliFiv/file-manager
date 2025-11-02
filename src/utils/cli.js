export function getUsernameFromArgs(argv) {
    const usernameArg = argv.find(arg => arg.startsWith('--username='));
    if (!usernameArg) return null;
    const username = usernameArg.split('=')[1];
    return username || null;
}
