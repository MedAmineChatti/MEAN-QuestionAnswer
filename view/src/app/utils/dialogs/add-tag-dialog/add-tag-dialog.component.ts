import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';
import{TagService} from '../../../../services/tag.service';
import  { Router } from '@angular/router';
import {  MatDialogRef} from '@angular/material/dialog';
import { TagMangmentComponent } from '../../../admin/layouts/tag-mangment/tag-mangment.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.css']
})
export class AddTagDialogComponent implements OnInit {

  newTag = new Tag();
  constructor(
    private tagDataService: TagService,
    private router: Router,
    private dialogRef: MatDialogRef <TagMangmentComponent>
  ) { }

  ngOnInit(): void {
  }

 









  addTag(){ 
        console.log( 'FIRST : '+this.newTag);
        this.tagDataService.addTag(this.newTag).subscribe((res) =>{
          console.warn(res);
          Swal.fire({
            icon:'success',
            text:'Tag added successfully',
            confirmButtonColor: "#00395D"
          }).then(()=>{ 
          this.dialogRef.close(false);

           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           this.router.onSameUrlNavigation = 'reload';
           this.router.navigate(['/dashboard/tagmangment']);
          } )  
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
