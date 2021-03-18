import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import {combineLatest, of, Subject} from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { HintService } from "../services/hint.service";
import { HoveredService } from "../services/hovered.service";
import { AbstractHint } from "../interfaces/abstracts/hint";


export const HINT_HOVERED_CLASS = '_hint_hovered';
const SHOW_DELAY = 300;
const HIDE_DELAY = 300;

@Directive({
  selector: '[tuiHint]:not(ng-container)',
})
export class HintDirective extends AbstractHint implements OnDestroy {
  readonly componentHovered$ = new Subject<boolean>();
  destroy$ = new Subject<void>();
  public content = ''

  @Input()
  set tuiHint(value: any) {
    if (!value) {
      this.hideTooltip();
      this.content = '';

      return;
    }
    this.content = value;
  }

  constructor(
    @Inject(Renderer2) private readonly renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef<HTMLElement>,
    @Inject(HintService) hintService: HintService,
    @Inject(HoveredService) hoveredService: HoveredService,
  ) {
    super(elementRef, hintService);


    combineLatest(
      hoveredService.createHovered$(elementRef.nativeElement),
      this.componentHovered$.pipe(startWith(false)),
    )
      .pipe(
        map(
          ([directiveHovered, componentHovered]) =>
            directiveHovered || componentHovered,
        ),
        switchMap(visible => {
          this.toggleClass(visible);
          return of(visible).pipe(delay(visible ? SHOW_DELAY : HIDE_DELAY));
        }),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: visible => {
          if (visible) {
            this.showTooltip();
          } else {
            this.hideTooltip();
          }
        },
        complete: () => {
          this.hideTooltip();
        },
      });
  }

  getElementClientRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  ngOnDestroy() {
    this.hideTooltip();
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected showTooltip() {
    if (this.content === '') {
      return;
    }
    this.toggleClass(true);
    this.hintService.add(this);
  }

  protected hideTooltip() {
    this.toggleClass(false);
    this.hintService.remove(this);
  }

  private toggleClass(add: boolean) {
    if (add) {
      this.renderer.addClass(this.elementRef.nativeElement, HINT_HOVERED_CLASS);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, HINT_HOVERED_CLASS);
    }
  }
}
