import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
editortab=1;
  constructor() { }

  ngOnInit() {
  }
  editortabClick(index) {
        this.editortab = index;

    }
}
