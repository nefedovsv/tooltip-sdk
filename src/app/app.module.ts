import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HintDirective } from "./directives/hint.directive";
import { HintContainer } from './components/hint/hint.container';
import { HintComponent } from './components/hint/box/hint.component';
import { HoveredDirective } from "./directives/hovered.directive";
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownBoxComponent } from './components/dropdown/dropdown-box/dropdown-box.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { PortalHostComponent } from './components/dropdown/portal-host/portal-host.component';

@NgModule({
  declarations: [
    AppComponent,
    HintDirective,
    HoveredDirective,
    DropdownDirective,
    HintContainer,
    HintComponent,
    DropdownComponent,
    DropdownBoxComponent,
    PortalHostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
