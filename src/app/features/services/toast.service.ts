import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: Toast['type'] = 'success'): void {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { id, message, type };
    this._toasts.update(t => [...t, toast]);
    setTimeout(() => this.dismiss(id), 3500);
  }

  dismiss(id: string): void {
    this._toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
