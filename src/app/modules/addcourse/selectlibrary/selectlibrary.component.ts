import { Component, OnInit, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-selectlibrary',
  templateUrl: './selectlibrary.component.html',
  styleUrls: ['./selectlibrary.component.scss']
})
export class SelectlibraryComponent implements OnInit {
  @Output() library_constant = new EventEmitter<boolean>();
  libraryTabContent:number = 1;
  chapter_details:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  libraryTabClick(tab_id) {
      // alert(this.libraryTabContent);
      this.libraryTabContent = tab_id;
  }
  chaptershow(){
    this.chapter_details = true;
  }
  show_chapter_back(){
        this.chapter_details = false;
  }
  library_popup_hide(){
    this.library_constant.emit(false);
  }
}
