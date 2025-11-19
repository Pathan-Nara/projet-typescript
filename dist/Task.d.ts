export interface Task {
    taskId: number;
    title: string;
    status: 'pending' | 'progress' | 'finished';
}
export declare function createTask(tittle: string, status: 'pending' | 'progress' | 'finished'): Task;
export declare class Tasklist {
    private taskListId;
    private tasks;
    constructor();
    showTasks(): void;
    addTask(task: Task): void;
    removeTask(id: number): void;
    listTasks(filter?: 'pending' | 'progress' | 'finished'): Task[];
    saveTasklist(filename?: string): void;
    loadTasklist(filename: string): void;
}
//# sourceMappingURL=Task.d.ts.map