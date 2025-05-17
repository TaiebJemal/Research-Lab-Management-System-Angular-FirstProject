import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirme-dialog',
  templateUrl: './confirme-dialog.component.html',
  styleUrls: ['./confirme-dialog.component.css']
})
export class ConfirmeDialogComponent {
  // forcage de type => boite de dialogue
  constructor(public dialogRef: MatDialogRef<ConfirmeDialogComponent>) { }

}
