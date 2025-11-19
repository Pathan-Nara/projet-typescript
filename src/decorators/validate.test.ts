import { describe, it, expect, vi } from 'vitest';
import { validate, validateAdd } from './validate.js';

describe('Décorateur @validateAdd', () => {
    it('devrait accepter un objet Task valide', () => {
        class TestClass {
            @validateAdd
            addTask(task: any) {
                return task;
            }
        }

        const instance = new TestClass();
        const validTask = { title: 'Test', status: 'pending' };

        expect(() => instance.addTask(validTask)).not.toThrow();
    });

    it('devrait rejeter un titre vide', () => {
        class TestClass {
            @validateAdd
            addTask(task: any) {
                return task;
            }
        }

        const instance = new TestClass();
        const invalidTask = { title: '   ', status: 'pending' };

        expect(() => instance.addTask(invalidTask)).toThrow('La tache ne peut pas etre vide');
    });

    it('devrait logger les validations réussies', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        
        class TestClass {
            @validateAdd
            addTask(task: any) {
                return task;
            }
        }

        const instance = new TestClass();
        instance.addTask({ title: 'Test', status: 'pending' });

        expect(consoleSpy).toHaveBeenCalledWith('Validation réussie pour addTask');
    });
});

describe('Décorateur @validate', () => {
    it('devrait valider un ID correct', () => {
        class TestClass {
            @validate
            removeTask(id: number) {
                return id;
            }
        }

        const instance = new TestClass();
        
        expect(() => instance.removeTask(5)).not.toThrow();
    });

    it('devrait rejeter un ID négatif', () => {
        class TestClass {
            @validate
            removeTask(id: number) {
                return id;
            }
        }

        const instance = new TestClass();
        
        expect(() => instance.removeTask(-1)).toThrow('ID invalide');
    });

    it('devrait rejeter ID = 0', () => {
        class TestClass {
            @validate
            removeTask(id: number) {
                return id;
            }
        }

        const instance = new TestClass();
        
        expect(() => instance.removeTask(0)).toThrow('ID invalide');
    });

    it('devrait valider plusieurs paramètres', () => {
        class TestClass {
            @validate
            updateTask(id: number, title: string, status: string) {
                return { id, title, status };
            }
        }

        const instance = new TestClass();
        
        expect(() => instance.updateTask(1, 'Test', 'pending')).not.toThrow();
    });

    it('devrait logger les validations réussies', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        
        class TestClass {
            @validate
            testMethod(id: number) {
                return id;
            }
        }

        const instance = new TestClass();
        instance.testMethod(1);

        expect(consoleSpy).toHaveBeenCalledWith('Validation réussie pour testMethod');
    });
});
