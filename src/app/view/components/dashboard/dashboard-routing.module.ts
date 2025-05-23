import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { DashboardComponent } from './dashboard.component';
import { DietsComponent } from './diets/diets.component';
import { TrainingsComponent } from './trainings/trainings.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    {
        path: 'avaliacao',
        component: AssessmentComponent,
    },
    {
        path: 'treino',
        component: TrainingsComponent,
    },
    {
        path: 'dieta',
        component: DietsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
