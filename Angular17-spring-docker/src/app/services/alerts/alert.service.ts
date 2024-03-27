import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject$ = new BehaviorSubject<Alert>({});

  constructor() { }

  initObsAlert(): Observable<Alert> {
    return this.alertSubject$.asObservable();
  }

  success(message: string) {
    this.alertSubject$.next({ type: 'success', message: message });
  }

  error(message: string) {
    this.alertSubject$.next({ type: 'error', message: message });
  }

  clear() {
    this.alertSubject$.next({});
  }
}
