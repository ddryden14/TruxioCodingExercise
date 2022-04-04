import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingList } from '../../Interfaces/ShoppingList';

@Component({
    selector: 'addListDialog',
    templateUrl: 'addListDialog.component.html',
  })
  export class AddListDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<AddListDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ShoppingList,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }