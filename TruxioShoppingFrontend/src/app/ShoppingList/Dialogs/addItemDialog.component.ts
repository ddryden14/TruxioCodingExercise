import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingItem } from '../../Interfaces/ShoppingItem';

@Component({
    selector: 'addItemDialog',
    templateUrl: 'addItemDialog.component.html',
  })
  export class AddItemDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<AddItemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ShoppingItem,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }