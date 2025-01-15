export const getInventoryId = (id)=>{
    return 'id-'+id;
}
/**
 * Check if a value is whitespace, NaN, or undefined.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is whitespace, NaN, or undefined; otherwise, false.
 */
export function isInvalidValue(value) {
    if (value === undefined || value === null) return true; // Check for undefined or null
    if (typeof value === 'string' && value.trim() === '') return true; // Check for whitespace string
    if (typeof value === 'number' && isNaN(value)) return true; // Check for NaN
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return true;
    return false; // Valid value
}