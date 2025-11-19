import { describe, it, expect } from 'vitest';
import { createTask } from './Task.js';
describe('createTask', () => {
    it('devrait créer une tâche avec titre et status', () => {
        const task = createTask('Ma tâche', 'pending');
        expect(task.title).toBe('Ma tâche');
        expect(task.status).toBe('pending');
        expect(task.createdAt).toBeDefined();
    });
    it('devrait créer une tâche avec une date par défaut', () => {
        const task = createTask('Test', 'progress');
        expect(task.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
    it('devrait créer une tâche avec une date personnalisée', () => {
        const task = createTask('Test', 'finished', '2025-12-25');
        expect(task.createdAt).toBe('2025-12-25');
    });
});
//# sourceMappingURL=Task.test.js.map