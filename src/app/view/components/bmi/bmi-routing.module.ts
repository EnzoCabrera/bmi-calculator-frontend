import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BmiComponent } from './bmi.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BmiComponent }
    ])],
    exports: [RouterModule]
})
export class BmiRoutingModule { }
