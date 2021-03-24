import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, MODALS } from './app.component';
import { HintDirective } from "./directives/hint.directive";
import { HintContainer } from './components/hint/hint.container';
import { HintComponent } from './components/hint/box/hint.component';
import { HoveredDirective } from "./directives/hovered.directive";
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownBoxComponent } from './components/dropdown/dropdown-box/dropdown-box.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { PortalHostComponent } from './components/dropdown/portal-host/portal-host.component';
import { ExampleComponent } from './components/modal/example/example.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { ModalHostComponent } from './components/modal/modal-host/modal-host.component';
import { ModalService } from './services/modal.service';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

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
    ExampleComponent,
    ModalComponent,
    ModalHostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PolymorpheusModule
  ],
  providers: [{
    provide: MODALS,
    useExisting: ModalService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
