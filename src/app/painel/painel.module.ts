import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PainelRoutingModule } from "./painel-routing.module";
import { PainelComponent } from "./painel.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [
    PainelComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PainelRoutingModule,
    GoogleMapsModule,
  ],
  exports: [],
})
export class PainelModule {}
