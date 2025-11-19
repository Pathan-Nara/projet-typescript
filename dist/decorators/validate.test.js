var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { describe, it, expect, vi } from 'vitest';
import { validate } from './validate.js';
describe('Décorateur @validate', () => {
    describe('validation d\'objet Task', () => {
        it('devrait accepter un objet Task valide', () => {
            class TestClass {
                addTask(task) {
                    return task;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "addTask", null);
            const instance = new TestClass();
            const validTask = { title: 'Test', status: 'pending' };
            expect(() => instance.addTask(validTask)).not.toThrow();
        });
        it('devrait rejeter un titre vide', () => {
            class TestClass {
                addTask(task) {
                    return task;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "addTask", null);
            const instance = new TestClass();
            const invalidTask = { title: '   ', status: 'pending' };
            expect(() => instance.addTask(invalidTask)).toThrow('Le titre ne peut pas etre vide');
        });
        it('devrait rejeter un status invalide', () => {
            class TestClass {
                addTask(task) {
                    return task;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "addTask", null);
            const instance = new TestClass();
            const invalidTask = { title: 'Test', status: 'invalid' };
            expect(() => instance.addTask(invalidTask)).toThrow('Statut invalide');
        });
    });
    describe('validation de paramètres séparés', () => {
        it('devrait valider un ID correct', () => {
            class TestClass {
                removeTask(id) {
                    return id;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "removeTask", null);
            const instance = new TestClass();
            expect(() => instance.removeTask(5)).not.toThrow();
        });
        it('devrait rejeter un ID négatif', () => {
            class TestClass {
                removeTask(id) {
                    return id;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "removeTask", null);
            const instance = new TestClass();
            expect(() => instance.removeTask(-1)).toThrow('ID invalide');
        });
        it('devrait rejeter ID = 0', () => {
            class TestClass {
                removeTask(id) {
                    return id;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "removeTask", null);
            const instance = new TestClass();
            expect(() => instance.removeTask(0)).toThrow('ID invalide');
        });
        it('devrait valider plusieurs paramètres', () => {
            class TestClass {
                updateTask(id, title, status) {
                    return { id, title, status };
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number, String, String]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "updateTask", null);
            const instance = new TestClass();
            expect(() => instance.updateTask(1, 'Test', 'pending')).not.toThrow();
        });
        it('devrait logger les validations réussies', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            class TestClass {
                testMethod(id) {
                    return id;
                }
            }
            __decorate([
                validate,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "testMethod", null);
            const instance = new TestClass();
            instance.testMethod(1);
            expect(consoleSpy).toHaveBeenCalledWith('Validation réussie pour testMethod');
        });
    });
});
//# sourceMappingURL=validate.test.js.map