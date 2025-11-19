import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DataStore } from './DataStore.js';
import * as fs from 'fs';

interface TestItem {
    id: number;
    name: string;
}

describe('DataStore', () => {
    const testFilename = 'test-datastore.json';
    const testFilePath = 'src/data/save/test-datastore.json';
    let store: DataStore<TestItem>;

    beforeEach(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
        store = new DataStore<TestItem>(testFilename);
    });

    afterEach(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    describe('create', () => {
        it('devrait créer un item avec ID auto-incrémenté', () => {
            const item: TestItem = { id: 0, name: 'Item 1' };
            store.create(item);

            expect(item.id).toBe(1);
            const items = store.readAll();
            expect(items).toHaveLength(1);
        });

        it('devrait incrémenter les IDs correctement', () => {
            const item1: TestItem = { id: 0, name: 'Item 1' };
            const item2: TestItem = { id: 0, name: 'Item 2' };
            
            store.create(item1);
            store.create(item2);

            expect(item1.id).toBe(1);
            expect(item2.id).toBe(2);
        });
    });

    describe('readAll', () => {
        it('devrait retourner un tableau vide si aucun item', () => {
            const items = store.readAll();
            expect(items).toEqual([]);
        });

        it('devrait retourner tous les items', () => {
            store.create({ id: 0, name: 'Item 1' });
            store.create({ id: 0, name: 'Item 2' });

            const items = store.readAll();
            expect(items).toHaveLength(2);
        });
    });

    describe('findById', () => {
        it('devrait trouver un item par son ID', () => {
            const item: TestItem = { id: 0, name: 'Trouvable' };
            store.create(item);

            const found = store.findById(item.id);
            expect(found).toBeDefined();
            expect(found?.name).toBe('Trouvable');
        });

        it('devrait retourner undefined si item non trouvé', () => {
            const found = store.findById(999);
            expect(found).toBeUndefined();
        });
    });

    describe('update', () => {
        it('devrait mettre à jour un item existant', () => {
            const item: TestItem = { id: 0, name: 'Original' };
            store.create(item);

            const updated: TestItem = { id: item.id, name: 'Modifié' };
            store.update(item, updated);

            const found = store.findById(item.id);
            expect(found?.name).toBe('Modifié');
        });

        it('ne devrait rien faire si item non trouvé', () => {
            const item1: TestItem = { id: 0, name: 'Item 1' };
            store.create(item1);

            const fakeItem: TestItem = { id: 999, name: 'Fake' };
            const updated: TestItem = { id: 999, name: 'Updated' };
            store.update(fakeItem, updated);

            const items = store.readAll();
            expect(items).toHaveLength(1);
            expect(items[0]?.name).toBe('Item 1');
        });
    });

    describe('delete', () => {
        it('devrait supprimer un item existant', () => {
            const item: TestItem = { id: 0, name: 'À supprimer' };
            store.create(item);

            store.delete(item);

            const items = store.readAll();
            expect(items).toHaveLength(0);
        });

        it('ne devrait rien faire si item non trouvé', () => {
            const item1: TestItem = { id: 0, name: 'Item 1' };
            store.create(item1);

            const fakeItem: TestItem = { id: 999, name: 'Fake' };
            store.delete(fakeItem);

            const items = store.readAll();
            expect(items).toHaveLength(1);
        });
    });

    describe('save et load', () => {
        it('devrait sauvegarder les données dans un fichier', () => {
            store.create({ id: 0, name: 'Persistant' });
            store.save();

            expect(fs.existsSync(testFilePath)).toBe(true);
        });

        it('devrait charger les données depuis un fichier', () => {
            store.create({ id: 0, name: 'Item 1' });
            store.save();

            const newStore = new DataStore<TestItem>(testFilename);
            const items = newStore.readAll();

            expect(items).toHaveLength(1);
            expect(items[0]?.name).toBe('Item 1');
        });

        it('ne devrait pas crasher si le fichier n\'existe pas', () => {
            expect(() => {
                const newStore = new DataStore<TestItem>('inexistant.json');
                newStore.load();
            }).not.toThrow();
        });
    });
});
