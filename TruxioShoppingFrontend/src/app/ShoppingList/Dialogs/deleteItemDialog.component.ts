import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'deleteItemDialog',
    templateUrl: 'deleteItemDialog.component.html',
  })
  export class DeleteItemDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string
    ) {}
  }