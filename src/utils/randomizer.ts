export function randomAlphabet(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}
