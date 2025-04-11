import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';

const routes: Routes = [
    { path: '', redirectTo: 'avaliacao', pathMatch: 'full' },
    {
        path: 'avaliacao',
        component: AssessmentComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
