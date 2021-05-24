import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InternalMessageService {

    constructor() { }
    private subject = new Subject<any>();
    public pageReviewed = new Subject<any>();
    private wallFilterEvent = new Subject<any>();
    public message = new Subject();


    setCommand(typ: number, command: string) {
        this.subject.next({
            type: typ,
            command: command
        });
    }

    getCommand(): Observable<any> {
        return this.subject.asObservable();
    }

    clearCommand() {
        this.subject.next();
    }
    //========================================================================================

    setWallFilter(typ) {
        this.wallFilterEvent.next({
            'type': typ
        });
    }

    getWallFilter(): Observable<any> {
        return this.wallFilterEvent.asObservable();
    }


    setMessage(value) {
        this.message.next(value);
    }
    setPageReviewed(value) {
        this.pageReviewed.next(value);
    }


}
