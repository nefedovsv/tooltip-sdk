import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Injectable()
export abstract class AbstractModalService<T extends {}> extends Observable<ReadonlyArray<any>> {
  protected abstract readonly component: PolymorpheusContent<any>;

  protected abstract readonly defaultOptions: any;

  protected readonly modals$ = new BehaviorSubject<any[]>([]);

  protected constructor(
  ) {
    super(observer => this.modals$.subscribe(observer));
  }

  open<G>(
    content: PolymorpheusContent<any>,
    options: any = {},
  ): Observable<G> {

    return new Observable(observer => {
      const completeWith = (result: G) => {
        observer.next(result);
        observer.complete();
      };
      const modal = {
        ...this.defaultOptions,
        ...options,
        content,
        completeWith,
        $implicit: observer,
        component: this.component,
      };
      this.modals$.next([...this.modals$.value, modal]);
      return () => {
        this.modals$.next(this.modals$.value.filter((item: any) => item !== modal));
      };
    });
  }
}
