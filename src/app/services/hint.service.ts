import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { AbstractHint } from "../interfaces/abstracts/hint";

@Injectable({
  providedIn: 'root',
})
export class HintService extends Observable<ReadonlyArray<AbstractHint>> {
  private readonly hints$ = new BehaviorSubject<ReadonlyArray<AbstractHint>>([]);

  constructor() {
    super(observer => this.hints$.subscribe(observer));
  }

  add(directive: AbstractHint) {
    this.hints$.next([...this.hints$.value, directive]);
  }

  remove(directive: AbstractHint) {
    this.hints$.next(this.hints$.value.filter(hint => hint !== directive));
  }
}
