import { Component, OnInit } from '@angular/core';
import { TagService  } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags:any; 
  p:any; 
  title:any;
  constructor(
    private tagDataService: TagService 

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


}
