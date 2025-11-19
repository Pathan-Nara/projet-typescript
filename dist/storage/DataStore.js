import fs from 'fs';
export class DataStore {
    filename;
    items = [];
    constructor(filename) {
        this.filename = filename;
        if (!fs.existsSync('src/data/save')) {
            fs.mkdirSync('src/data/save', { recursive: true });
        }
        this.load();
    }
    readAll() {
        return this.items;
    }
    load() {
        try {
            if (fs.existsSync(`src/data/save/${this.filename}`)) {
                const data = fs.readFileSync(`src/data/save/${this.filename}`, 'utf-8');
                this.items = JSON.parse(data);
            }
        }
        catch (error) {
            console.error('Erreur lors du chargement du fichier :', error);
        }
    }
    save() {
        const data = JSON.stringify(this.items, null, 2);
        fs.writeFileSync(`src/data/save/${this.filename}`, data, 'utf-8');
    }
    create(item) {
        let maxId = 0;
        for (let i = 0; i < this.items.length; i++) {
            const thisPointItem = this.items[i];
            if (thisPointItem && thisPointItem.id > maxId) {
                maxId = thisPointItem.id;
            }
        }
        item.id = maxId + 1;
        this.items.push(item);
        this.save();
    }
    delete(item) {
        for (let i = 0; i < this.items.length; i++) {
            const thisPointItem = this.items[i];
            if (thisPointItem && thisPointItem.id === item.id) {
                this.items.splice(i, 1);
                this.save();
                break;
            }
        }
    }
    update(item, updatedItem) {
        for (let i = 0; i < this.items.length; i++) {
            const thisPointItem = this.items[i];
            if (thisPointItem && thisPointItem.id === item.id) {
                this.items[i] = updatedItem;
                this.save();
                break;
            }
        }
    }
    findById(id) {
        return this.items.find(item => item.id === id);
    }
}
//# sourceMappingURL=DataStore.js.map