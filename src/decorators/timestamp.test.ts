import { describe, it, expect, vi, beforeEach } from 'vitest';
import { timestamp } from './timestamp.js';

describe('Décorateur @timestamp', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('devrait logger le timestamp avant l\'exécution', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        
        class TestClass {
            @timestamp
            testMethod() {
                return 'result';
            }
        }

        const instance = new TestClass();
        instance.testMethod();

        expect(consoleSpy).toHaveBeenCalled();
        const logMessage = consoleSpy.mock.calls[0]?.[0] as string;
        expect(logMessage).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] Appel de la méthode testMethod/);
    });

    it('devrait exécuter la méthode originale', () => {
        class TestClass {
            @timestamp
            getValue() {
                return 42;
            }
        }

        const instance = new TestClass();
        const result = instance.getValue();

        expect(result).toBe(42);
    });

    it('devrait retourner la valeur de la méthode originale', () => {
        class TestClass {
            @timestamp
            calculate(a: number, b: number) {
                return a + b;
            }
        }

        const instance = new TestClass();
        const result = instance.calculate(5, 3);

        expect(result).toBe(8);
    });

    it('devrait fonctionner avec des méthodes async', async () => {
        class TestClass {
            @timestamp
            async asyncMethod() {
                return Promise.resolve('async result');
            }
        }

        const instance = new TestClass();
        const result = await instance.asyncMethod();

        expect(result).toBe('async result');
    });

    it('devrait logger avec le bon nom de méthode', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        
        class TestClass {
            @timestamp
            myCustomMethod() {
                return true;
            }
        }

        const instance = new TestClass();
        instance.myCustomMethod();

        const logMessage = consoleSpy.mock.calls[0]?.[0] as string;
        expect(logMessage).toContain('myCustomMethod');
    });
});
