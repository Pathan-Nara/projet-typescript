import { DataStore } from '../storage/DataStore.js';
export function createTask(title, status, createdAt = new Date().toISOString().split('T')[0]) {
    return {
        title,
        status,
        createdAt
    };
}
export class Tasklist {
    store;
    constructor() {
        this.store = new DataStore('tasklist.json');
    }
    showTasks() {
        const tasks = this.store.readAll();
        console.log(JSON.stringify(tasks, null, 2));
    }
    addTask(task) {
        this.store.create(task);
    }
    updateTask(id, title, status) {
        const task = this.store.findById(id);
        if (task) {
            task.title = title;
            task.status = status;
            this.store.save();
            console.log(`la tache ${id} a ete mise a jour`);
        }
        else {
            console.log(`la tache n'existe pas`);
        }
    }
    removeTask(id) {
        const task = this.store.findById(id);
        if (task) {
            this.store.delete(task);
            console.log(`la tache ${id} a ete supprimee`);
        }
        else {
            console.log(`la tache n'existe pas`);
        }
    }
    listTasks(filter) {
        const allTasks = this.store.readAll();
        if (!filter)
            return allTasks;
        return allTasks.filter(task => task.status === filter);
    }
    saveTasklist(filename) {
        this.store.save();
    }
    loadTasklist(filename) {
        this.store.load();
    }
}
//# sourceMappingURL=Task.js.map