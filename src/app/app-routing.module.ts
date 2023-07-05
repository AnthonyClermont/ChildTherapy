import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {AboutMeComponent} from "./components/about-me/about-me.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about-me', component: AboutMeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
