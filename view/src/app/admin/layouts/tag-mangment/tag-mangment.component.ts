import { Component, OnInit } from '@angular/core';
import { TagService  } from 'src/app/services/tag.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTagDialogComponent } from 'src/app/components/utils/dialogs/add-tag-dialog/add-tag-dialog.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EditTagDialogComponent } from 'src/app/components/utils/dialogs/edit-tag-dialog/edit-tag-dialog.component';

@Component({
  selector: 'app-tag-mangment',
  templateUrl: './tag-mangment.component.html',
  styleUrls: ['./tag-mangment.component.css']
})

export class TagMangmentComponent implements OnInit {
  tags:any; 
  p:any;
  title:any;
  constructor(
    private tagDataService: TagService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.readTags(); 
}

readTags() {
    this.tagDataService.getAllTags().subscribe((res) => {
        this.tags = res; 
    });
}


Search(){
  if(this.title==''){
      this.ngOnInit();
  }
  else { 
      this.tags = this.tags.filter((res: { title: string; } ) =>{  
          if (res.title !== "") { 
              return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase()); 
          } 
          else {  
              return this.ngOnInit();
          }        
      })
  }
}



openAddTagDialog()   {
  this.dialog.open(AddTagDialogComponent, {
         width:"50%",   
  });
}
openEditTagDialog( tagId : any)  {
    this.dialog.open(EditTagDialogComponent, { 
         width:"50%",   
        data: { 
        tagId: tagId
      },
    });
  }





removeTag( id:any) {   
  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  })
  .then((result) => {
      if (result.isConfirmed) { 
          this.tagDataService.deleteTag(id).subscribe((res) => {  
              Swal.fire( {
                  title: 'Deleted!',
                  text: 'Your tag has been deleted.',
                  icon: 'success'          
              })
              .then(()=>{
                  this.readTags();
              })
          })  
      } 
  }) 
} 





}
