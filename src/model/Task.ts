import { DataStore } from '../storage/DataStore.js';
import { validate, validateAdd} from '../decorators/validate.js';
import { timestamp } from '../decorators/timestamp.js';


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

    @timestamp
    showTasks(): void {
        const tasks = this.store.readAll();
        console.log(JSON.stringify(tasks, null, 2));
    }

    @validateAdd
    @timestamp
    addTask(task: Omit<Task, 'id'>): void {
        this.store.create(task as Task);
    }

    @validate
    @timestamp
    updateTask(id: number, title: string, status: 'pending' | 'progress' | 'finished', createdAt: string): void {
        const task = this.store.findById(id);
        if (task) {
            task.title = title;
            task.status = status;
            task.createdAt = createdAt;
            this.store.save();
            console.log(`la tache ${id} a ete mise a jour`);
        } else {
            console.log(`la tache n'existe pas`);
        }
    }

    @validate
    @timestamp
    removeTask(id: number): void {
        const task = this.store.findById(id);
        if (task) {
            this.store.delete(task);
            console.log(`la tache ${id} a ete supprimee`);
        } else {
            console.log(`la tache n'existe pas`);
        }
    }


    @timestamp
    listTasks(filter?: 'pending' | 'progress' | 'finished'): Task[] {
        const allTasks = this.store.readAll();
        if (!filter) return allTasks;
        return allTasks.filter(task => task.status === filter);
    }

    
    @timestamp
    saveTasklist(filename?: string): void {
        this.store.save();
    }

    @timestamp
    loadTasklist(filename?: string): void {
        this.store.load();
    }
}