export function isInt(value: any): boolean {
    if (typeof value === 'number' && Number.isInteger(value)) {
        return true;
    }
    return false;
}