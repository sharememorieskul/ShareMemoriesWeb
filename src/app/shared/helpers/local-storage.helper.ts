export class LocalStorageHelper {
    static setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getItem<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key));
    }
    static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
