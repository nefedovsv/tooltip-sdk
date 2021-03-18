import {Directive, ElementRef, Inject, Output} from '@angular/core';
import {Observable} from 'rxjs';
import { HoveredService } from "../services/hovered.service";

@Directive({
  selector: '[hoveredChange]',
})
export class HoveredDirective {
  @Output()
  readonly hoveredChange: Observable<boolean>;

  constructor(
    @Inject(ElementRef) {nativeElement}: ElementRef<Element>,
    @Inject(HoveredService) hoveredService: HoveredService,
  ) {
    this.hoveredChange = hoveredService.createHovered$(nativeElement);
  }
}
