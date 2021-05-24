import {Injectable} from '@angular/core';
import {ConstantService} from '../services/constant.service';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private Socket;
    public event;
    constructor(private _constatntService: ConstantService) {

    }

    socketControllerFailed = () => {
        return Observable.create((observer) => {
            this.Socket.on('Connect_failed', (data) => {
                observer.next(data);
            });
        });
    }

    connectSocket() {
        this.Socket = io(this._constatntService.websocketURL, {
            'reconnection': true,
            'reconnectionDelay': 2000,
            'reconnectionAttempts': 10
        });
    }

    socketStatusCheck = () => {
        return Observable.create((observer) => {
            if (this.Socket) observer.next(this.Socket.connected);
            else observer.next(true);
        })
    };

    socketControllerSet(event, data) {
        console.log(event, "   ", data);
        this.Socket.emit(event, data);
        this.Socket.on(event, (data) => {console.log(data);});
    }

    socketControllerConnect = () => {
        return Observable.create((observer) => {
            this.Socket.on('connection', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerDisonnect = () => {
        return Observable.create((observer) => {
            this.Socket.on('disconnect', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerJoin = () => {
        return Observable.create((observer) => {
            this.Socket.on('addUser', (data) => {
                observer.next(data);
            });
        });
    }


    socketControllerGetMsg = () => {
        return Observable.create((observer) => {
            this.Socket.on('updateChat', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerUpdateUsers = () => {
        return Observable.create((observer) => {
            this.Socket.on('updateUsers', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerUserNotification = () => {
        return Observable.create((observer) => {
            this.Socket.on('userNotification', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerAdminNotification = () => {
        return Observable.create((observer) => {
            this.Socket.on('adminNotification', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerStartStream = () => {
        return Observable.create((observer) => {
            this.Socket.on('startStream', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerStopStream = () => {
        return Observable.create((observer) => {
            this.Socket.on('stopStream', (data) => {
                observer.next(data);
            });
        });
    }

    socketControllerViewStream = () => {
        return Observable.create((observer) => {
            this.Socket.on('viewStream', (data) => {
                observer.next(data);
            });
        });
    }



}
