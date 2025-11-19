import { isDate } from '../strategies/validators/isDate.js';
import { isInt } from '../strategies/validators/isInt.js';

export function validateAdd(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const task = args[0];
        
        if (!task || task.title.trim() === '') {
            throw new Error('La tache ne peut pas etre vide');
        }
        
        console.log(`Validation réussie pour ${propertyKey}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const id = args[0];
        const title = args[1];
        const status = args[2];
        const dateStr = args[3];

        if (!id && !(!title)){
            if (title.trim() === '') {
                throw new Error('Le titre ne peut pas etre vide');
            }
        }

        if (id !== undefined && (!isInt(id) || id <= 0)) {
            throw new Error('ID invalide');
        }

        if (title !== undefined && title.trim() === '') {
            throw new Error('Le titre ne peut pas etre vide');
        }

        if (status !== undefined && !['pending', 'progress', 'finished'].includes(status)) {
            throw new Error('Statut invalide');
        }

        if (dateStr !== undefined && !isDate(dateStr)) {
            throw new Error('Date invalide');
        }

        console.log(`Validation réussie pour ${propertyKey}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}