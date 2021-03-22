import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../../../directives/dropdown.directive';


@Component({
  selector: 'app-dropdown-box',
  templateUrl: './dropdown-box.component.html',
  styleUrls: ['./dropdown-box.component.scss']
})
export class DropdownBoxComponent {
  constructor(
   public readonly directive: DropdownDirective,
  ) {}
}
