var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { timestamp } from './timestamp.js';
describe('Décorateur @timestamp', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('devrait logger le timestamp avant l\'exécution', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        class TestClass {
            testMethod() {
                return 'result';
            }
        }
        __decorate([
            timestamp,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestClass.prototype, "testMethod", null);
        const instance = new TestClass();
        instance.testMethod();
        expect(consoleSpy).toHaveBeenCalled();
        const logMessage = consoleSpy.mock.calls[0]?.[0];
        expect(logMessage).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] Appel de la méthode testMethod/);
    });
    it('devrait exécuter la méthode originale', () => {
        class TestClass {
            getValue() {
                return 42;
            }
        }
        __decorate([
            timestamp,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestClass.prototype, "getValue", null);
        const instance = new TestClass();
        const result = instance.getValue();
        expect(result).toBe(42);
    });
    it('devrait retourner la valeur de la méthode originale', () => {
        class TestClass {
            calculate(a, b) {
                return a + b;
            }
        }
        __decorate([
            timestamp,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Number, Number]),
            __metadata("design:returntype", void 0)
        ], TestClass.prototype, "calculate", null);
        const instance = new TestClass();
        const result = instance.calculate(5, 3);
        expect(result).toBe(8);
    });
    it('devrait fonctionner avec des méthodes async', async () => {
        class TestClass {
            async asyncMethod() {
                return Promise.resolve('async result');
            }
        }
        __decorate([
            timestamp,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], TestClass.prototype, "asyncMethod", null);
        const instance = new TestClass();
        const result = await instance.asyncMethod();
        expect(result).toBe('async result');
    });
    it('devrait logger avec le bon nom de méthode', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        class TestClass {
            myCustomMethod() {
                return true;
            }
        }
        __decorate([
            timestamp,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestClass.prototype, "myCustomMethod", null);
        const instance = new TestClass();
        instance.myCustomMethod();
        const logMessage = consoleSpy.mock.calls[0]?.[0];
        expect(logMessage).toContain('myCustomMethod');
    });
});
//# sourceMappingURL=timestamp.test.js.map