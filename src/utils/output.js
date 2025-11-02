export function printCwd() {
    console.log(`\nYou are currently in ${process.cwd()}`);
}

export const sayGoodbye = (username) => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
};
