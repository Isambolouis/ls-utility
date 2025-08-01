/**
 * Encrypts a string by converting each character to its ASCII code
 * and mapping each digit of the code to a corresponding letter from a fixed interval.
 * The result is a semicolon-separated string.
 * @param text - The input string to encrypt
 * @returns The encrypted string
 */
export function crypto(text: string): string;

/**
 * Decrypts a string previously encrypted with the `crypto` function.
 * It reverses the mapping and reconstructs the original characters.
 * @param text - The encrypted string (semicolon-separated)
 * @returns The original decrypted string
 */
export function decrypt(text: string): string;
