import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
@Component({
    selector: 'app-profilefilter',
    templateUrl: './profilefilter.component.html',
    styleUrls: ['./profilefilter.component.scss']
})
export class ProfilefilterComponent implements OnInit {
    @Output() postFilter = new EventEmitter<string>();
    config: any;
    postTypArr = [];
    userId: number;
    selectedCheckboxArr = [];
    checkBoxes = {
        one: false,
        two: false,
        zero: false,
        three: false
    }
    checkBoxesValue = {
        one: 1,
        two: 2,
        zero: 0,
        three: 3
    }

    constructor(public _constantService: ConstantService) { }

    ngOnInit() {

        this.userId = this._constantService.getSessionDataBYKey('u_id');

    }


    addTyp(event, value) {
        if (!event.target.checked) {
            this.checkBoxes.zero = false;
        }
        if (!event.target.checked && value == 0) {
            this.checkBoxes.one = false;
            this.checkBoxes.two = false;
            this.checkBoxes.three = false;
        }

        if (event.target.checked && value == 0) {
            this.checkBoxes.one = true;
            this.checkBoxes.two = true;
            this.checkBoxes.three = true;
        }

        if (this.checkBoxes.one && this.checkBoxes.two && this.checkBoxes.three) {
            this.checkBoxes.zero = true;
        }

        this.selectedCheckboxArr = [];
        for (var key in this.checkBoxes) {
            if (this.checkBoxes[key]) {
                this.selectedCheckboxArr.push(this.checkBoxesValue[key]);
            }
        }

        if (!this.checkBoxes.one && !this.checkBoxes.two && !this.checkBoxes.three) {
            this.selectedCheckboxArr = ['1', '2', '3', '4', '5', '6'];
        }

        let searchString = this.selectedCheckboxArr.toString();
        if (searchString.length == 0) {
            this.postFilter.emit("1,2,3,4,5,6");
        } else {
            this.postFilter.emit(searchString);
        }
    }
}
