/**
 * @return A random integer from the provided range
 */
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @return A random item from an array
 */
export const randomItem = (arr) => arr[randomInt(0, arr.length - 1)];
