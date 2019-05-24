export class LocalStorageHelper {
    static setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getItem(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }
    static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
