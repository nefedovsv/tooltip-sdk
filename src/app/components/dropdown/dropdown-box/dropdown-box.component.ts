import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../../../directives/dropdown.directive';


@Component({
  selector: 'app-dropdown-box',
  templateUrl: './dropdown-box.component.html',
  styleUrls: ['./dropdown-box.component.scss']
})
export class DropdownBoxComponent implements OnInit {

  constructor(
   public readonly directive: DropdownDirective,
  ) {
  }

  ngOnInit(): void {
  }

}
