import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-createfolder',
    templateUrl: './createfolder.component.html',
    styleUrls: ['./createfolder.component.scss']
})
export class CreatefolderComponent implements OnInit {
    constructor() {}
    @Output() createfolderpara = new EventEmitter<boolean>();
    createfolderhidevar: boolean = false;
    ngOnInit() {
    }


    createfolderhide() {
        this.createfolderpara.emit(this.createfolderhidevar);
    }


}
