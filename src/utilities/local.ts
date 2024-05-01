/**
 * Retrieves a single item from the local storage based on the provided key.
 * @param key The key to search for in the local storage.
 * @param type The expected type of the retrieved value: 'string' or 'object'.
 * @returns The retrieved value, parsed as specified by the type, or null if not found.
 */
export const getOneLocalStorage = <T>(key: string, type: 'string' | 'object' = 'string') => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return type === 'object' ? (JSON.parse(value) as T) : value;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Sets a single item into the local storage.
 * @param key The key under which to store the item.
 * @param payload The value to store. If not a string, it will be converted to a JSON string.
 */
export const setOneLocalStorage = <T>(key: string, payload: T) => {
  try {
    localStorage.setItem(key, typeof payload === 'string' ? payload : JSON.stringify(payload));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Removes a single item from the local storage based on the provided key.
 * @param key The key of the item to remove from the local storage.
 */
export const removeOneLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};