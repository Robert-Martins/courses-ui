import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    private cache: Map<string, any> = new Map<string, any>();

    public setItem(key: string, value: any): void {
        this.cache.set(key, value);
    }

    public getItem(key: string): any {
        return this.cache.get(key);
    }

    public removeItem(key: string): void {
        this.cache.delete(key);
    }

    public clear(): void {
        this.cache.clear();
    }
    
}