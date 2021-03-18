import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HintDirective } from "./directives/hint.directive";
import { HintContainer } from './components/hint/hint.container';
import { HintComponent } from './components/hint/box/hint.component';
import { HoveredDirective } from "./directives/hovered.directive";

@NgModule({
  declarations: [
    AppComponent,
    HintDirective,
    HoveredDirective,
    HintContainer,
    HintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
