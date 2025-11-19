export interface Task {
    id: number;
    title: string;
    status: 'pending' | 'progress' | 'finished';
    createdAt?: string;
}
export declare function createTask(title: string, status: 'pending' | 'progress' | 'finished', createdAt?: string): Omit<Task, 'id'>;
export declare class Tasklist {
    private store;
    constructor();
    showTasks(): void;
    addTask(task: Omit<Task, 'id'>): void;
    updateTask(id: number, title: string, status: 'pending' | 'progress' | 'finished'): void;
    removeTask(id: number): void;
    listTasks(filter?: 'pending' | 'progress' | 'finished'): Task[];
    saveTasklist(filename?: string): void;
    loadTasklist(filename?: string): void;
}
//# sourceMappingURL=Task.d.ts.map