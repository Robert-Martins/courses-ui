import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public start(): void {
        this.loading$.next(true);
    }

    public stop(): void {
        this.loading$.next(false);
    }

    public get isLoading() {
        return this.loading$.asObservable();
    }

}