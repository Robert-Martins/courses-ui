import { Injectable } from "@angular/core";
import { PlatformService } from "./platform.service";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(
        private readonly platformService: PlatformService
    ) { }

    public setItem(key: string, value: any): void {
        this.platformService.performOnBrowser(() => 
            localStorage.setItem(key, JSON.stringify(value))
        );
    }

    public getItem(key: string): any {
        return this.platformService.isBrowser() ? 
            this.getFromLocalStorage(key) : null;
    }

    public removeItem(key: string): void {
        this.platformService.performOnBrowser(() => 
            localStorage.removeItem(key)
        );
    }

    public clear(): void {
        this.platformService.performOnBrowser(() =>
            localStorage.clear()
        );
    }

    private getFromLocalStorage(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

}