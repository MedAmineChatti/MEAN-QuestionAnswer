import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import { AddQuestionDialogComponent } from 'src/app/components/utils/dialogs/add-question-dialog/add-question-dialog.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
   data:any;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }


  onClickSubmit( ) {
   
}

  ngOnInit(): void {
   
  }

  openAddQuestionDialog(){
    this.dialog.open(AddQuestionDialogComponent, {
       maxHeight:"500px"    
    });
  }
}
