import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Tasklist } from './Task.js';
import * as fs from 'fs';
describe('Tasklist', () => {
    let tasklist;
    const testFilePath = 'src/data/save/tasklist.json';
    beforeEach(() => {
        // Nettoyer avant chaque test
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
        tasklist = new Tasklist();
    });
    afterEach(() => {
        // Nettoyer après chaque test
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });
    describe('addTask', () => {
        it('devrait ajouter une tâche et lui assigner un ID', () => {
            const task = { title: 'Nouvelle tâche', status: 'pending' };
            tasklist.addTask(task);
            const tasks = tasklist.listTasks();
            expect(tasks).toHaveLength(1);
            expect(tasks[0]?.id).toBe(1);
            expect(tasks[0]?.title).toBe('Nouvelle tâche');
        });
        it('devrait rejeter une tâche avec titre vide', () => {
            const task = { title: '   ', status: 'pending' };
            expect(() => tasklist.addTask(task)).toThrow('La tache ne peut pas etre vide');
        });
        it('devrait auto-incrémenter les IDs', () => {
            tasklist.addTask({ title: 'Tâche 1', status: 'pending' });
            tasklist.addTask({ title: 'Tâche 2', status: 'progress' });
            const tasks = tasklist.listTasks();
            expect(tasks[0]?.id).toBe(1);
            expect(tasks[1]?.id).toBe(2);
        });
    });
    describe('removeTask', () => {
        it('devrait supprimer une tâche par ID', () => {
            tasklist.addTask({ title: 'À supprimer', status: 'pending' });
            const tasks = tasklist.listTasks();
            const id = tasks[0]?.id;
            tasklist.removeTask(id);
            const remaining = tasklist.listTasks();
            expect(remaining).toHaveLength(0);
        });
        it('devrait rejeter un ID invalide', () => {
            expect(() => tasklist.removeTask(-1)).toThrow('ID invalide');
            expect(() => tasklist.removeTask(0)).toThrow('ID invalide');
        });
        it('devrait gérer la suppression d\'une tâche inexistante', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            tasklist.removeTask(999);
            expect(consoleSpy).toHaveBeenCalledWith('la tache n\'existe pas');
        });
    });
    describe('updateTask', () => {
        it('devrait mettre à jour une tâche existante', () => {
            tasklist.addTask({ title: 'Original', status: 'pending' });
            const tasks = tasklist.listTasks();
            const id = tasks[0]?.id;
            tasklist.updateTask(id, 'Modifié', 'progress', '2025-11-20');
            const updated = tasklist.listTasks();
            expect(updated[0]?.title).toBe('Modifié');
            expect(updated[0]?.status).toBe('progress');
            expect(updated[0]?.createdAt).toBe('2025-11-20');
        });
        it('devrait rejeter un ID invalide', () => {
            expect(() => tasklist.updateTask(0, 'Test', 'pending', '2025-11-20')).toThrow('ID invalide');
        });
        it('devrait rejeter un titre vide', () => {
            tasklist.addTask({ title: 'Test', status: 'pending' });
            const id = tasklist.listTasks()[0]?.id;
            expect(() => tasklist.updateTask(id, '  ', 'pending', '2025-11-20')).toThrow('Le titre ne peut pas etre vide');
        });
    });
    describe('listTasks', () => {
        beforeEach(() => {
            tasklist.addTask({ title: 'Tâche pending', status: 'pending' });
            tasklist.addTask({ title: 'Tâche progress', status: 'progress' });
            tasklist.addTask({ title: 'Tâche finished', status: 'finished' });
        });
        it('devrait lister toutes les tâches sans filtre', () => {
            const tasks = tasklist.listTasks();
            expect(tasks).toHaveLength(3);
        });
        it('devrait filtrer les tâches par status pending', () => {
            const tasks = tasklist.listTasks('pending');
            expect(tasks).toHaveLength(1);
            expect(tasks[0]?.status).toBe('pending');
        });
        it('devrait filtrer les tâches par status progress', () => {
            const tasks = tasklist.listTasks('progress');
            expect(tasks).toHaveLength(1);
            expect(tasks[0]?.status).toBe('progress');
        });
        it('devrait filtrer les tâches par status finished', () => {
            const tasks = tasklist.listTasks('finished');
            expect(tasks).toHaveLength(1);
            expect(tasks[0]?.status).toBe('finished');
        });
    });
    describe('showTasks', () => {
        it('devrait afficher toutes les tâches en JSON', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            tasklist.addTask({ title: 'Test', status: 'pending' });
            tasklist.showTasks();
            expect(consoleSpy).toHaveBeenCalled();
            const output = consoleSpy.mock.calls[0]?.[0];
            expect(output).toContain('"title": "Test"');
        });
    });
    describe('saveTasklist et loadTasklist', () => {
        it('devrait sauvegarder et recharger les tâches', () => {
            tasklist.addTask({ title: 'Persistante', status: 'pending' });
            tasklist.saveTasklist();
            const newTasklist = new Tasklist();
            newTasklist.loadTasklist();
            const tasks = newTasklist.listTasks();
            expect(tasks).toHaveLength(1);
            expect(tasks[0]?.title).toBe('Persistante');
        });
    });
});
//# sourceMappingURL=Tasklist.test.js.map