/**
 * Encodes a text string into a custom obfuscated character set using a predefined character code mapping.
 * Internally transforms the char codes into pairs and maps them to a substitution set.
 * @param text - The input string to encode
 * @returns The obfuscated encoded string
 */
export function encode(text: string): string;

/**
 * Decodes a string encoded with the `encode` function, reconstructing the original characters.
 * Uses character mapping and delimiter logic to identify and restore original char codes.
 * @param text - The encoded string
 * @returns The decoded original string
 */
export function decode(text: string): string;
