/**
 * Generates a URL query string from an object of parameters.
 *
 * @param {Object} params - The object containing parameters to be converted to a query string.
 * @returns {string} The URL query string generated from the parameters object.
 * @template T - The type of the object containing parameters. It extends an object with string keys and any values.
 */
export const getSearchParams = <T extends { [key: string]: any }>(params: T): string => {
  const url = new URLSearchParams();

  Object.entries(params).map(([key, value]) => {
    if (!value) {
      return;
    }
    url.append(key, value as string);
  });

  return url.toString();
};

/**
 * Checks if a value is an instance of a specified type.
 * 
 * @param {*} value - The value to be checked.
 * @param {Function} type - The constructor function representing the type to check against.
 * @returns {boolean} True if the value is an instance of the specified type, otherwise false.
 * @template T - The type to be checked against.
 */
export const isType = <T>(value: any, type: new (...args: any[]) => T): value is T => {
  return value instanceof type;
};
