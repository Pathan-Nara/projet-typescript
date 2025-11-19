var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataStore } from '../storage/DataStore.js';
import { validate, validateAdd } from '../decorators/validate.js';
import { timestamp } from '../decorators/timestamp.js';
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
    updateTask(id, title, status, createdAt) {
        const task = this.store.findById(id);
        if (task) {
            task.title = title;
            task.status = status;
            task.createdAt = createdAt;
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
__decorate([
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Tasklist.prototype, "showTasks", null);
__decorate([
    validateAdd,
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Tasklist.prototype, "addTask", null);
__decorate([
    validate,
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", void 0)
], Tasklist.prototype, "updateTask", null);
__decorate([
    validate,
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Tasklist.prototype, "removeTask", null);
__decorate([
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], Tasklist.prototype, "listTasks", null);
__decorate([
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Tasklist.prototype, "saveTasklist", null);
__decorate([
    timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Tasklist.prototype, "loadTasklist", null);
//# sourceMappingURL=Task.js.map