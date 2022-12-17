import { NumberSymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  
  private defaultDuration: number;

  constructor(private snackBar: MatSnackBar) {
    this.defaultDuration = 3;
  }

  showSnackBar(message: string, action: string, durationParam?: number) {
    this.snackBar.open(message, action, { duration: durationParam != null ? durationParam * 1000 : this.defaultDuration * 1000});
  }

}
