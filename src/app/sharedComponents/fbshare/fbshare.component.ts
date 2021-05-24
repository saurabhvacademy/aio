import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
@Component({
  selector: 'app-fbshare',
  templateUrl: './fbshare.component.html',
  styleUrls: ['./fbshare.component.scss']
})
export class FbshareComponent implements AfterViewInit {
    @Input() url;

    constructor() {
        // initialise facebook sdk after it loads if required

        if (!window['fbAsyncInit']) {
            window['fbAsyncInit'] = function () {
                window['FB'].init({
                    appId: 'your-app-id',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v3.0'
                });
            };
        }

        // load facebook sdk if required
        const url = 'https://connect.facebook.net/en_US/sdk.js';
        if (!document.querySelector(`script[src='${this.url}']`)) {
            let script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }
    }

    ngAfterViewInit(): void {
        // render facebook button
        window['FB'] && window['FB'].XFBML.parse();
        console.log('++++++++++++++++++++++++++++++++share fb post link +++++++++++++++++++++++++++++++++++++++++++++');
        console.log(this.url);
        console.log('+++++++++++++++++++++++share fb post link +++++++++++++++++++++++++++');
    }
}
