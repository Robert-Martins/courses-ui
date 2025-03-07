import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
    
    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) { }

    public isBrowser(): boolean {
        return this.platformId === 'browser';
    }

    public isServer(): boolean {
        return this.platformId === 'server';
    }

    public performOnBrowser(callback: () => void): void {
        if (this.isBrowser()) {
            callback();
        }
    }

    public performOnServer(callback: () => void): void {
        if (this.isServer()) {
            callback();
        }
    }

}