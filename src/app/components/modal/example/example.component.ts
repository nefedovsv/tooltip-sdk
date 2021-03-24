import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: any,
  ) {}

  ok(): void {
    this.context.completeWith(true);
  }

  cancel(): void {
    this.context.completeWith(false);
  }

}
