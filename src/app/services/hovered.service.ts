import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, NgZone} from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  mapTo,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HoveredService {
  private readonly documentEvents$: Observable<Event>;

  constructor(
    @Inject(DOCUMENT) documentRef: Document,
    @Inject(NgZone) private readonly ngZone: NgZone,
  ) {
    this.documentEvents$ = merge(
      fromEvent(documentRef, 'mousemove'),
    );
  }

  createHovered$(
    target: Element,
  ): Observable<boolean> {
    return fromEvent(target, 'mouseenter').pipe(
      switchMap(() =>
        merge(
          fromEvent(target, 'mouseleave'),
          this.documentEvents$.pipe(
            filter(event => !target.contains(getActualTarget(event))),
            take(1),
          ),
        ).pipe(mapTo(false), startWith(true)),
      ),
      distinctUntilChanged(),
    );
  }
}

export function getActualTarget(event: Event): Node {
  if ('composedPath' in event) {
    return (event as any).composedPath()[0];
  }
  return (event as any).target;
}
