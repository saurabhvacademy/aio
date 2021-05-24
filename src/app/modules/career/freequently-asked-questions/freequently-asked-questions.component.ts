import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freequently-asked-questions',
  templateUrl: './freequently-asked-questions.component.html',
  styleUrls: ['./../../scholarship/accordian.css', './freequently-asked-questions.component.scss']
})
export class FreequentlyAskedQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
  }

}
