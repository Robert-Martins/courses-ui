import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private $opened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private SIDEBAR_TOGGLE_STATE_KEY = 'SIDEBAR_TOGGLE_STATE';

  constructor(
    private readonly localStorageService: LocalStorageService
  ) { 
    this.getState();
  }

  public toggleSidebar() {
    this.$opened.next(!this.$opened.value);
    this.saveState();
  }

  public get opened() {
    return this.$opened.asObservable();
  }

  private saveState() {
    this.localStorageService.setItem(
      this.SIDEBAR_TOGGLE_STATE_KEY, 
      this.$opened.value
    );
  }

  private getState() {
    const state = this.localStorageService.getItem(this.SIDEBAR_TOGGLE_STATE_KEY);
    if (state) {
      this.$opened.next(JSON.parse(state));
    }
  }

}
