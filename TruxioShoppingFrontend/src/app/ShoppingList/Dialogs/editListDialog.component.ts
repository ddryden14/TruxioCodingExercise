import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'editListDialog',
    templateUrl: 'editListDialog.component.html',
  })
  export class EditListDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<EditListDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }