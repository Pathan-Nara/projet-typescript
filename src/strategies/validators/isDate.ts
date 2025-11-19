export function isDate(value: any): boolean {
    if (typeof value === 'string') {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }
    if (Object.prototype.toString.call(value) === '[object Date]') {
        return !isNaN(value.getTime());
    }
    return false;
}