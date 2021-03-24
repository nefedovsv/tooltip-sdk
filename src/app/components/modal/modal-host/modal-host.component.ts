import { Component, Inject } from '@angular/core';
import { TUI_DIALOGS } from '../../../app.component';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss']
})
export class ModalHostComponent {
  readonly dialogs$ = merge(...this.dialogs);

  constructor(
    @Inject(TUI_DIALOGS)
    private readonly dialogs: ReadonlyArray<Observable<ReadonlyArray<any>>>,
  ) { }
}
