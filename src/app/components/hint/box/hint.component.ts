import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { animationFrameScheduler, of } from "rxjs";
import { HintContainer } from "../hint.container";
import { AbstractHint } from "../../../interfaces/abstracts/hint";


@Component({
  selector: 'app-hint-box',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit {
  @Input() hint?: AbstractHint;

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(HintContainer) private readonly hintsHost: HintContainer,
  ) {
    of(0, animationFrameScheduler).subscribe(() => {
      this.calculateCoordinates();
    });

  }

  ngOnInit(): void {
  }
  private calculateCoordinates() {
    if (!this.hint) {
      throw new Error('Hint directive is missing');
    }
    const hostRect = this.hint.getElementClientRect();
    const portalRect = this.hintsHost.clientRect;
    const tooltip = this.elementRef.nativeElement;
    const {style} = tooltip;
    const tooltipRect = tooltip.getBoundingClientRect();
    style.top = '100px'
    style.left = '100px'
  }
}
