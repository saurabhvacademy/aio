import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PdfReaderComponent} from './pdf-reader.component';


const routes: Routes = [
    {
        path: '',
        component: PdfReaderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class pdfReaderRoutingModule {}
