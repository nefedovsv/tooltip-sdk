import {Directive, ElementRef, OnDestroy} from '@angular/core';
import { HintService } from "../../services/hint.service";

@Directive()
export abstract class AbstractHint implements OnDestroy {

  content: any;

  constructor(
    protected readonly elementRef: ElementRef<HTMLElement>,
    protected readonly hintService: HintService,
  ) {}

  abstract getElementClientRect(): ClientRect;

  ngOnDestroy() {
    this.hideTooltip();
  }

  protected showTooltip() {
    this.hintService.add(this);
  }

  protected hideTooltip() {
    this.hintService.remove(this);
  }
}
