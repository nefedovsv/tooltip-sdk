import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy } from '@angular/core';
import { HintService } from "../../services/hint.service";
import { skip, takeUntil } from "rxjs/operators";
import { HintDirective } from "../../directives/hint.directive";
import { Subject } from "rxjs";
import { AbstractHint } from "../../interfaces/abstracts/hint";


@Component({
  selector: 'hint-container',
  templateUrl: './hint.container.html',
  styleUrls: ['./hint.container.scss']
})
export class HintContainer implements OnDestroy {
  destroy$ = new Subject<void>();
  hints: ReadonlyArray<AbstractHint> = [];

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(HintService) hints$: HintService,
    @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    hints$.pipe(skip(1), takeUntil(this.destroy$)).subscribe(hints => {
      this.hints = hints;
      this.changeDetectorRef.detectChanges();
    });
  }

  get clientRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  onHovered(hovered: boolean, directive: AbstractHint) {
    if (directive instanceof HintDirective) {
      directive.componentHovered$.next(hovered);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
