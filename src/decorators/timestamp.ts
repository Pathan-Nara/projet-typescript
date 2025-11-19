export function timestamp(target: unknown, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
        const now = new Date().toLocaleTimeString('fr-FR');
        console.log(`[TIMESTAMP] ${now} - Appel de ${key}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}
