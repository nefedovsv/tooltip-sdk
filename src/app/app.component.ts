import { Component, ViewChild } from '@angular/core';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // open = false;

  // @ViewChild(DropdownComponent)
  // component?: DropdownComponent;

  // onClick() {
  //   this.open = false;
  //
  //   if (this.component && this.component.nativeFocusableElement) {
  //     this.component.nativeFocusableElement.focus();
  //   }
  // }
}
