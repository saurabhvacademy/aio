import { Injectable } from '@angular/core';
declare var MQ: any;
declare var $: any;
import { ConstantService } from './constant.service';

@Injectable()
export class PostdataService {
    junkText = '<div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;"><div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;"><div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div></div>';
    constructor(
        public _constantService: ConstantService,
    ) {

    }

    ngOnInit() { }

    arr = [];
    setPostData(data: any) {
        this.arr = [];
        localStorage.setItem('post_data', JSON.stringify(data));

    }


    getPostData() {
        this.arr = JSON.parse(localStorage.getItem('post_data'));
        return this.arr;
    }

    setPostDataAttach(data: any) {
        this.arr = [];
        localStorage.setItem('post_data_attch', JSON.stringify(data));

    }

    getPostDataAttach() {
        this.arr = JSON.parse(localStorage.getItem('post_data_attch'));
        return this.arr;
    }



    getQuestionTextToSave(post_id) {
        var idList = $("span[id^='que_id_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var que_text_data = '';
        // setTimeout(() => {
            var que_text_data = document.getElementById(post_id + "_quesText").innerHTML;
            return que_text_data;
        // }, 10000);
        return que_text_data;

    }



    getOption1TextToSave(post_id) {
        var idList = $("span[id^='opt_1_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var opt_1_text_data = document.getElementById(post_id + "_opt1_Text").innerHTML;
        return opt_1_text_data;
    }



    getOption2TextToSave(post_id) {
        var idList = $("span[id^='opt_2_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var opt_2_text_data = document.getElementById(post_id + "_opt2_Text").innerHTML;
        return opt_2_text_data;
    }

    getOption3TextToSave(post_id) {
        var idList = $("span[id^='opt_3_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var opt_3_text_data = document.getElementById(post_id + "_opt3_Text").innerHTML;
        return opt_3_text_data;
    }

    getOption4TextToSave(post_id) {
        var idList = $("span[id^='opt_4_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var opt_4_text_data = document.getElementById(post_id + "_opt4_Text").innerHTML;
        return opt_4_text_data;
    }

    getOption5TextToSave(post_id) {
        var idList = $("span[id^='opt_5_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var opt_5_text_data = document.getElementById(post_id + "_opt5_Text").innerHTML;
        return opt_5_text_data;
    }


    getOption6TextToSave(post_id) {
        var idList = $("span[id^='opt_6_']");
        var len = idList.length;
        for (var i = 0; i < len; i++) {
            $("#" + idList[i].id).removeClass("mq-editable-field");
            $("span").remove(".mq-textarea");
            $("span").removeClass("mq-editable-field");
            $("span").removeAttr("mathquill-block-id");
            $("span").removeAttr("mathquill-command-id");
            $("#" + idList[i].id).removeAttr("id");
        }
        var opt_6_text_data = document.getElementById(post_id + "_opt6_Text").innerHTML;
        return opt_6_text_data;
    }

    getPostDateTime(posttime: any) {
        if (posttime == null) {
            result = "Just Now";
        } else {
            var date = new Date(parseInt(posttime));
            var day = date.getDate();
            var month = date.toLocaleString("en-us", { month: "short" });
            var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            var year = date.getFullYear();
            var currentTime = new Date();
            var currentTimetoday = Math.floor(Date.now());
            var diff = Math.abs(currentTimetoday - posttime) / 1000;
            var days = Math.floor(diff / 86400);
            var currentYear = currentTime.getFullYear();
            var year_diff = currentYear - year;
            var result = "";
            if (days == 0) {
                diff -= days * 86400;
                var hour = Math.floor(diff / 3600) % 24;
                diff -= hour * 3600;
                var min = Math.floor(diff / 60) % 60;
                if (min == 0 && hour == 0) {
                    result = "Just Now";
                } else if (min == 0 && hour != 0) {
                    result = hour + " hr";
                } else if (min != 0 && hour == 0) {
                    result = min + " min";
                } else {
                    result = hour + " hr " + min + " min";
                }
            } else {
                if (year_diff == 0) {
                    result = day + " " + month + " " + time;
                } else {
                    result = day + " " + month + " " + year + " " + time;
                }
            }
        }

        return result;
    }

    encodeURIPostData(data: string) {
        try {
            return encodeURIComponent(data.replace(/[\u200B-\u200D\uFEFF\uFFFD]/g, '').trim());
        } catch (e) {
            return data;
        }

    }

    decodeURIPostData(data: string) {
        try {
            return decodeURIComponent(data.replace(/[\u200B-\u200D\uFEFF\uFFFD]/g, '').trim());
        } catch (e) {
            return data;
        }
    }



    UnwantedContent(id) {
        var text = document.getElementById(id).innerHTML.trim();
        if (text.length == 0) {
            return "";
        } else {
            var data = document.getElementById(id).innerHTML.trim();
            data = data.replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "");
            data = data.replace(/&nbsp;/g, " ");
            data = data.trim();
            data = data.replace(/&#09;/g, "");
            data = data.replace(/<span _ngcontent-c21="" class="placeholder" id="post_placeholder">Discuss within your interest.<\/span>/g, "");
            data = data.replace(/class="([^"]*)"/g, "");
            data = data.replace(/Title="([^"]*)"/g, "");
            data = data.replace(/title="([^"]*)"/g, "");
            data = data.replace(/<div>/g, "");
            data = data.replace(/<\/div>/g, "<br>");
            data = data.replace(/\<(?!span|br|a|href="([^"]*)"|\/span|\/br|\/a).*?\>/g, "");
            data = data.replace(/<!---->/g, "");
            data = data.replace(/<div  style="left: 0px; bottom: 0px;"><div  tabindex="0" style="left: 0px; width: 0px;"><\/div><\/div><div  style="top: 0px; right: 0px;"><div  tabindex="0" style="top: 0px; height: 0px;"><\/div><\/div>/g, "");
            data = data.replace(/<div  style="left: 0px; bottom: 0px;"><div  tabindex="0" style="left: 0px; width: 0px;"><\/div><\/div><div  style="top: 0px; right: 0px;"><div  tabindex="0" style="top: 0px; height: 0px;"><\/div><\/div>/g, "");
            data = data.trim();
            return data;
        }

    }


    searchStringInArray(str, strArray) {
        var count = 0;
        for (var j = 0; j < strArray.length; j++) {
            if (strArray[j].match(str)) count++;
        }
        return count;
    }

    onPaste(event) {
        setTimeout(() => {

            var postData = this.pastedDataStripping(event.target.id);
            setTimeout(() => {
                postData = postData.replace(/<br>/, "");
                document.getElementById(event.target.id).innerHTML = postData;
            }, 50)
            var x = document.getElementById(event.target.id);
            if (x != undefined && x != null) {
                setTimeout(() => {
                    this.placeCaretAtEnd(event.target.id);
                }, 51)
            } else {
                window.scrollTo(0, 0);
            }

        }, 200);
    }

    onPastepreventDefault(data, id) {
        var postData = this.pastedDataStrippingByData(data);
        console.log(postData);
        postData = document.getElementById(id).innerHTML + postData;

        document.getElementById(id).innerHTML = postData;
        console.log(9);
        return postData;
    }

    placeCaretAtEnd(id) {
        var el = document.getElementById(id);
        if (el != null && el != undefined) {
            el.focus();
        }
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }

    }

    publicLogin() {
        var x = <HTMLInputElement>document.getElementById('tokenless_UC');
        var y = <HTMLInputElement>document.getElementById('tokenless_PWD');
        if (x && y) {
            var userC = x.value;
            var userPWD = y.value;


        } else {

        }

    }

    getTextFromHyperlink(linkText: string) {
        var x = /^\<a.*\>.*\<\/a\>/i.test(linkText);
        if (x) {
            return linkText.match(/<a [^>]+>([^<]+)<\/a>/)[1];
        } else {
            return linkText;
        }
    }


    postDataManipulation(id) {
        var dataDiv = document.getElementById(id);
        if (dataDiv) {
            var data = dataDiv.innerHTML;
            data = data.replace(/<div>/g, "");
            data = data.replace(/<\/div>/g, "<br>");
            dataDiv.innerHTML = data;
            $("#" + id).find("*").not("span,br").each(function () {
                $(this).replaceWith(this.innerHTML);
            });
            $("#" + id).find("*").not(".s247,br").each(function () {
                $(this).replaceWith(this.innerHTML);
            });
            return this.removeUnwantedContent(id);
        }
    }

    postDataManipulationWithText(data) {
        data = data.replace(/<div>/g, "");
        data = data.replace(/<\/div>/g, "<br>");
        data = data.replace(/<!--bindings={/g, "");
        data = data.replace(/"ng-reflect-ng-if": "false"/g, "");
        data = data.replace(/}-->/g, "");
        data = data.replace(/<span _ngcontent-c21="" class="placeholder" id="post_placeholder">Discuss within your interest.<\/span>/g, "");
        data = data.replace(/What's on your mind ?/g, "");
        data = data.replace(/Discuss within your interest./g, "");
        data = data.replace(/%3C!--bindings%3D%7B%0A%20%20%22ng-reflect-ng-if%22%3A%20%22false%22%0A%7D--%3E/g, "");
        data = data.replace(/<div>/g, "");
        data = data.replace(/<\/div>/g, "<br>");
        data = data.replace(/\<(?!br|span|\/br|\/span).*?\>/g, "");
        data = data.replace(/<!---->/g, "");
        data = data.replace(/<div  style="left: 0px; bottom: 0px;"><div  tabindex="0" style="left: 0px; width: 0px;"><\/div><\/div><div  style="top: 0px; right: 0px;"><div  tabindex="0" style="top: 0px; height: 0px;"><\/div><\/div>/g, "");
        data = data.replace(/<div  style="left: 0px; bottom: 0px;"><div  tabindex="0" style="left: 0px; width: 0px;"><\/div><\/div><div  style="top: 0px; right: 0px;"><div  tabindex="0" style="top: 0px; height: 0px;"><\/div><\/div>/g, "")
        data = data.replace(/<br>$/g, "").trim();
        return data;

    }
    postDataManipulateHTML(text) {
        var data = text.replace(/<br[^>]*>/g, "").replace(/<span[^>]*>/g, "").replace(/<p[^>]*>/g, "").replace(/<hr[^>]*>/g, "");
        //data = data.replace(/<br[^>]*>/g, "")
        return data;
    }


    pastedDataStripping(id) {
        var data = this.removeUnwantedContent(id);
        if (data) {
            var StrippedString = data.replace(/\<(?!br|p|\/br|\/p).*?\>/g, "");
            return StrippedString.trim();
        }
    }

    pastedDataStrippingByData(str) {
        if (str) {
            var StrippedString = str.replace(/<(?!br\s*\/?)[^>]+>/g, "");
            return StrippedString.trim();
        }
    }


    removeUnwantedContent(id) {
        var dataDiv = document.getElementById(id);
        if (dataDiv) {
            var data = dataDiv.innerHTML;
            //data = this.linkActivate(data);
            data = data.replace(/<!--bindings={/g, "");
            data = data.replace(/"ng-reflect-ng-if": "false"/g, "");
            data = data.replace(/}-->/g, "");

            data = data.replace(/<span _ngcontent-c21="" class="placeholder" id="post_placeholder">Discuss within your interest.<\/span>/g, "");
            data = data.replace(/What's on your mind ?/g, "");
            data = data.replace(/Discuss within your interest./g, "");
            data = data.replace(/%3C!--bindings%3D%7B%0A%20%20%22ng-reflect-ng-if%22%3A%20%22false%22%0A%7D--%3E/g, "");
 ;
            data = data.replace(/<div>/g, "");
            data = data.replace(/<\/div>/g, "<br>");
            data = data.replace(/\<(?!br|span|\/br|\/span).*?\>/g, "");

            data = data.replace(/<!---->/g, "");
            data = data.replace(/<div  style="left: 0px; bottom: 0px;"><div  tabindex="0" style="left: 0px; width: 0px;"><\/div><\/div><div  style="top: 0px; right: 0px;"><div  tabindex="0" style="top: 0px; height: 0px;"><\/div><\/div>/g, "");
            data = data.replace(/<div  style="left: 0px; bottom: 0px;"><div  tabindex="0" style="left: 0px; width: 0px;"><\/div><\/div><div  style="top: 0px; right: 0px;"><div  tabindex="0" style="top: 0px; height: 0px;"><\/div><\/div>/g, "")

            data = data.replace(/<br>$/g, "").trim();
            return data;
        } else {
            return '';
        }
    }

    linkActivate(data: string) {
        var finalHtml = '';
        var urlRegEx = new RegExp("(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])");
        if (data) {
            data = data.replace(/<br>/g, "&nbsp;<br>&nbsp;");
            data = data.replace(/"/g, '&nbsp;"&nbsp;');
            data = data.replace(/&lt;/g, '&nbsp;&lt;&nbsp;');
            data = data.replace(/&gt;/g, '&nbsp;&gt;&nbsp;');
            data = data.replace(/ /g, "&nbsp;");
            data = data.replace(/&#160;/g, "&nbsp;")
            var arr = data.split('&nbsp;');

            for (var i = 0; i < arr.length; i++) {


                if (urlRegEx.test(arr[i])) {
                    var relValue = ' ';
                    if (this._constantService.isExternalLink(arr[i])) {
                        relValue = 'nofollow noopener';
                    }

                    if (arr[i].match('https://')) {
                        var html = ' <a class="anchorTag"  href=' + arr[i] + ' target="_blank" rel=' + '"' + relValue + '"' + '>' + arr[i] + '</a> ';
                        finalHtml += html;
                    } else {
                        var html = ' <a class="anchorTag"  href=' + "http://" + arr[i] + ' target="_blank" rel=' + '"' + relValue + '"' + '>' + arr[i] + '</a> ';
                        finalHtml += html;
                    }

                } else if (arr[i] == '&lt;' || arr[i] == '&gt;' || arr[i] == '"') {
                    finalHtml += '' + arr[i];
                } else if (arr[i - 1] == '&lt;' || arr[i - 1] == '&gt;' || arr[i] == '"') {
                    finalHtml += '' + arr[i];
                }
                else {
                    finalHtml += ' ' + arr[i];
                }
            }
            return finalHtml.trim();
        } else {
            return data;
        }

    }


    htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, "<br>");
    }

    copyToClipboard(divId) {
        var divText = (<HTMLInputElement>document.getElementById(divId));
        if (divText) {
            divText.select();
            document.execCommand("copy");
        }
        this._constantService.showToast("Link has been copied", "", "1");

    }

    copyPostURL(val: string, message="Link has been copied") {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this._constantService.showToast(message, "", "1");

    }

}
