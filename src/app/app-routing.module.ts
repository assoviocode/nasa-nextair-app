import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/painel/dashboard', pathMatch: 'full' },

  {
    path: 'painel',
    loadChildren: () =>
      import('./painel/painel.module').then((m) => m.PainelModule),
  },

  { path: '**', redirectTo: '/painel/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
