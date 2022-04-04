import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'editItemDialog',
    templateUrl: 'editItemDialog.component.html',
  })
  export class EditItemDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<EditItemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { name: string, quantity: number, link: string },
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }