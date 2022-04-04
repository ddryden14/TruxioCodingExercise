import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'deleteListDialog',
    templateUrl: 'deleteListDialog.component.html',
  })
  export class DeleteListDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<DeleteListDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string,
    ) {}
  }