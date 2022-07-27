import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {  ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import  { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TagMangmentComponent } from '../../../admin/layouts/tag-mangment/tag-mangment.component';


@Component({
  selector: 'app-edit-tag-dialog',
  templateUrl: './edit-tag-dialog.component.html',
  styleUrls: ['./edit-tag-dialog.component.css']
})
export class EditTagDialogComponent implements OnInit {
  tag :any = [];
  tagId :any;

  constructor(
    private route: ActivatedRoute,
    private tagDataService: TagService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef <TagMangmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 

  ) { }

  ngOnInit(): void {
    this.tagId = this.data.tagId;
    console.log(this.tagId);
    this.tagDataService.getTagById(this.tagId).subscribe((res) => {
      this.tag=res;
  });
  }

  updateTag(){ 
    console.log(this.tag);  
      this.tagDataService.updateTagById(this.tagId,this.tag).subscribe((res) =>{
        console.warn(res);
        Swal.fire({
          icon:'success',
          text:'Update  success',
          confirmButtonColor: "#00395D"
        }).then(()=>{
            this.dialogRef.close(false); 
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/dashboard/tagmangment']);
        }) 
      },(err:HttpErrorResponse) =>{

          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.msg,
              confirmButtonColor: "#00395D"
            })
      }) 
  }
}
