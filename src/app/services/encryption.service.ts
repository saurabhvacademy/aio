import {Injectable} from '@angular/core';

@Injectable()
export class EncryptionService {

    constructor() {}

    encrypt(data) {
        try {
            // console.log(btoa(unescape(encodeURIComponent(data))));

            // return btoa(unescape(encodeURIComponent(data)));
            return btoa(data);
        } catch (err) {
            console.log(err);
            return data;
        }
    }

    encryptutf8(data) {
        try {
            return btoa(unescape(encodeURIComponent(data)));
        } catch (err) {
            console.log(err);
            return data;
        }
    }



    decrypt(data) {
        try {
            // console.log(btoa(unescape(encodeURIComponent(data))));

            // return decodeURIComponent(escape(btoa(data)));
            return atob(data);
            
        } catch (err) {
            console.log(err);
            return data;
        }
    }

    decryptutf8(data) {
        try {
            return decodeURIComponent(escape(btoa(data)));
        } catch (err) {
            console.log(err);
            return data;
        }
    }

    decryptTest(data) {
        var finaldata = "";
        try {
            data = this.decrypt(data);
            var len = data.length;
            var data1 = data.substring(0, 4);
            var data2 = data.substring(105, len - 104);
            var data3 = data.substring(len - 4);
            finaldata = data1 + data2 + data3;
        } catch (Exception) {
            console.log(Exception);
        }

        return finaldata;
    }
}
