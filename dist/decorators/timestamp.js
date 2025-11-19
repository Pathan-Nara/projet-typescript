export function timestamp(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const now = new Date().toLocaleTimeString('fr-FR');
        console.log(`[TIMESTAMP] ${now} - Appel de ${key}`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
//# sourceMappingURL=timestamp.js.map