import { Tasklist, createTask } from './model/Task.js';
export class Cli {
    tasklist;
    constructor() {
        this.tasklist = new Tasklist();
    }
    run(args) {
        const [command, ...params] = args;
        switch (command) {
            case 'add':
                if (params[0] && params[1] && (params[1] === 'pending' || params[1] === 'progress' || params[1] === 'finished')) {
                    const newTask = createTask(params[0], params[1]);
                    this.tasklist.addTask(newTask);
                    console.log('la tache a ete ajoutee');
                }
                else {
                    console.log('Parametres invalides');
                }
                break;
            case 'remove':
                if (params[0]) {
                    this.tasklist.removeTask(Number(params[0]));
                }
                else {
                    console.log('Parametres invalides');
                }
                break;
            case 'list':
                const filter = params[0];
                if (filter) {
                    const filtered = this.tasklist.listTasks(filter);
                    console.log(JSON.stringify(filtered, null, 2));
                }
                else {
                    this.tasklist.showTasks();
                }
                break;
            case 'update':
                if (params[0] && params[1] && (params[2] === 'pending' || params[2] === 'progress' || params[2] === 'finished')) {
                    const id = Number(params[0]);
                    const title = params[1];
                    const status = params[2];
                    this.tasklist.updateTask(id, title, status);
                }
                else {
                    console.log('Parametres invalides');
                }
                break;
            case 'help':
                console.log('add "titre" "status" = ajouter une tache (mettez des guillemets si votre titre contient des espaces)');
                console.log('remove <id> = supprimer une tache par son id');
                console.log('list [status] = lister les taches, optionnellement filtrer par status');
                break;
        }
    }
}
//# sourceMappingURL=Cli.js.map