import type { NgZone } from '@angular/core';
import type { Store } from '@ngrx/store';

declare global {
  interface Window {
    Cypress?: unknown;
    ngZone?: NgZone;
    store?: Store<any>;
  }
}
