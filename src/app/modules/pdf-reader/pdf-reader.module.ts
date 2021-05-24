import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfReaderComponent } from './pdf-reader.component';
import { pdfReaderRoutingModule } from './pdfreader-routing.module';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SafepipeModule } from '../../componentHost/safepipe.module';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { CourseleftmenuModule } from './../../sharedComponents/courseleftmenu/courseleftmenu.module';
import { TrimdataModule } from './../../componentHost/trimdata.module';
import { FormsModule } from '@angular/forms';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule, InfiniteScrollModule, PerfectScrollbarModule, pdfReaderRoutingModule, TrimdataModule, SafepipeModule, HeaderModule, ConfirmationpopupModule, CourseleftmenuModule, FormsModule
    ],
    declarations: [PdfReaderComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class PdfReaderModule {


}
