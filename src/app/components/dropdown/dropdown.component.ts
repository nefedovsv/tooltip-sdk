import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DropdownDirective } from '../../directives/dropdown.directive';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() public content!: TemplateRef<any>;

  open = true;

  @ViewChild(DropdownDirective)
  private dropdownDirective?: DropdownDirective;

  get dropdown(): HTMLElement | null {
    return !this.dropdownDirective || this.dropdownDirective.dropdownBoxRef === null
      ? null
      : this.dropdownDirective.dropdownBoxRef.location.nativeElement;
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.open = false;
    }, 2000);
  }

}
