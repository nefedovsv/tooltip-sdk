import { Component, Inject, InjectionToken, Injector, ViewChild } from '@angular/core';
import { ModalService } from './services/modal.service';
import { ExampleComponent } from './components/modal/example/example.component';
import { Observable } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';



export const MODALS = new InjectionToken<
  ReadonlyArray<Observable<ReadonlyArray<any>>>
  >('A stream of dialogs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly modal = this.modalService.open<boolean>(
    new PolymorpheusComponent(ExampleComponent, this.injector),
    {dismissible: true },
  );
  public open = false;

  constructor(
    @Inject(ModalService) private readonly modalService: ModalService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(MODALS)
    readonly dialogs: readonly Observable<readonly unknown[]>[] | null,
  ) {}

  showDialog() {
    this.modal.subscribe({
      next: data => {
        console.log('Dialog emitted data = ' + data);
      },
      complete: () => {
        console.log('Dialog closed');
      },
    });
  }

  public onClick(): void {
    this.open = !this.open;
  }
}
