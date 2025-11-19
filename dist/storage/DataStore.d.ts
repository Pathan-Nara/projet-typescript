interface Id {
    id: number;
}
export declare class DataStore<T extends Id> {
    private filename;
    private items;
    constructor(filename: string);
    readAll(): T[];
    load(): void;
    save(): void;
    create(item: T): void;
    delete(item: T): void;
    update(item: T, updatedItem: T): void;
    findById(id: number): T | undefined;
}
export {};
//# sourceMappingURL=DataStore.d.ts.map