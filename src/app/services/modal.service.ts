import {Injectable} from '@angular/core';
import { ModalComponent } from '../components/modal/modal/modal.component';
import { AbstractModalService } from '../interfaces/abstracts/modal';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

const DEFAULT_OPTIONS: any = {
  dismissible: true,
};

@Injectable({
  providedIn: 'root',
})
export class ModalService extends AbstractModalService<any> {
  protected readonly component = new PolymorpheusComponent(ModalComponent);
  protected readonly defaultOptions = DEFAULT_OPTIONS;
}
