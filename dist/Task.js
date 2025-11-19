import fs from 'fs';
export function createTask(tittle, status) {
    const task = {
        taskId: Date.now(),
        title: tittle,
        status: status
    };
    return task;
}
export class Tasklist {
    taskListId;
    tasks;
    constructor() {
        this.taskListId = Date.now();
        this.tasks = [];
    }
    showTasks() {
        console.log(JSON.stringify(this.tasks, null, 2));
    }
    addTask(task) {
        // Trouver l'ID maximum existant
        let maxId = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            const thisPointTask = this.tasks[i];
            if (thisPointTask && thisPointTask.taskId > maxId) {
                maxId = thisPointTask.taskId;
            }
        }
        // Assigner le nouvel ID (max + 1)
        task.taskId = maxId + 1;
        // Ajouter la tâche
        this.tasks.push(task);
        console.log(`✅ Tâche ajoutée avec l'ID: ${task.taskId}`);
    }
    removeTask(id) {
        if (this.tasks.length === 0) {
            return;
        }
        for (let i = 0; i < this.tasks.length; i++) {
            const thisPointTask = this.tasks[i];
            if (thisPointTask && thisPointTask.taskId === id) {
                this.tasks.splice(i, 1);
                break;
            }
        }
    }
    listTasks(filter) {
        let filterd = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const thisPointTask = this.tasks[i];
            if (thisPointTask && thisPointTask.status === filter) {
                filterd.push(thisPointTask);
            }
        }
        return filterd;
    }
    saveTasklist(filename = 'tasklist.json') {
        const data = JSON.stringify(this.tasks, null, 2);
        fs.writeFileSync(`save/${filename}`, data, 'utf-8');
    }
    loadTasklist(filename) {
        if (!fs.existsSync(`save/${filename}`)) {
            return;
        }
        else {
            const data = fs.readFileSync(`save/${filename}`, 'utf-8');
            this.tasks = JSON.parse(data);
            this.saveTasklist();
        }
    }
}
//# sourceMappingURL=Task.js.map