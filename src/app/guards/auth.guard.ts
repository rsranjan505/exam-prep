// src/app/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../features/services/storage.service';

export const authGuard: CanActivateFn = () => {

  const storage = inject(StorageService);
  const router = inject(Router);

  const token = storage.get('token');

  // NOT LOGGED IN
  if (!token) {

    router.navigate(['/login']);

    return false;
  }

  // LOGGED IN
  return true;
};
