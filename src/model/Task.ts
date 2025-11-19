import { DataStore } from '../storage/DataStore.js';

export interface Task {
    id: number;
    title: string;
    status: 'pending' | 'progress' | 'finished';
    createdAt?: string;
}

export function createTask(title: string, status: 'pending' | 'progress' | 'finished', createdAt: string = new Date().toISOString().split('T')[0]!): Omit<Task, 'id'> {
    return {
        title,
        status,
        createdAt
    };
}

export class Tasklist {
    private store: DataStore<Task>;

    constructor() {
        this.store = new DataStore<Task>('tasklist.json');
    }

    showTasks(): void {
        const tasks = this.store.readAll();
        console.log(JSON.stringify(tasks, null, 2));
    }

    addTask(task: Omit<Task, 'id'>): void {
        this.store.create(task as Task);
    }

    updateTask(id: number, title: string, status: 'pending' | 'progress' | 'finished'): void {
        const task = this.store.findById(id);
        if (task) {
            task.title = title;
            task.status = status;
            this.store.save();
            console.log(`la tache ${id} a ete mise a jour`);
        } else {
            console.log(`la tache n'existe pas`);
        }
    }

    removeTask(id: number): void {
        const task = this.store.findById(id);
        if (task) {
            this.store.delete(task);
            console.log(`la tache ${id} a ete supprimee`);
        } else {
            console.log(`la tache n'existe pas`);
        }
    }

    listTasks(filter?: 'pending' | 'progress' | 'finished'): Task[] {
        const allTasks = this.store.readAll();
        if (!filter) return allTasks;
        return allTasks.filter(task => task.status === filter);
    }

    saveTasklist(filename?: string): void {
        this.store.save();
    }

    loadTasklist(filename?: string): void {
        this.store.load();
    }
}