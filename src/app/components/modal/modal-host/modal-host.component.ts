import { Component, Inject } from '@angular/core';
import { MODALS } from '../../../app.component';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss']
})
export class ModalHostComponent {
  readonly dialogs$ = merge(...this.dialogs);

  constructor(
    @Inject(MODALS)
    private readonly dialogs: ReadonlyArray<Observable<ReadonlyArray<any>>>,
  ) { }
}
