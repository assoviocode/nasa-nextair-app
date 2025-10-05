import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PainelComponent } from "./painel.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: PainelComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        resolve: {
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelRoutingModule {}
