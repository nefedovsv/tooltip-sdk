import {
  AfterViewChecked,
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  TemplateRef,
} from '@angular/core';
import { DropdownBoxComponent } from '../components/dropdown/dropdown-box/dropdown-box.component';
import { PortalService } from '../services/portal.service';



@Directive({
  selector: '[dropdown]:not(ng-container)',
})
export class DropdownDirective implements  AfterViewChecked {

  @Input('dropdown')
  set open(value: boolean) {
    if (value) {
      this.openDropdownBox();
    } else {
      this.closeDropdownBox();
    }
  }

  @Input('dropdownContent') public content!: TemplateRef<any>;
  dropdownBoxRef: ComponentRef<DropdownBoxComponent> | null = null;


  constructor(
    @Inject(ElementRef) elementRef: ElementRef<HTMLElement>,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private portalService: PortalService,
  ) { }

  protected openDropdownBox(): void {
    if (this.dropdownBoxRef !== null) {
      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DropdownBoxComponent,
    );
    this.dropdownBoxRef = this.portalService.add(componentFactory, this.injector);
    this.dropdownBoxRef.changeDetectorRef.detectChanges();
  }

  protected closeDropdownBox(): void {
    if (this.dropdownBoxRef === null) {
      return;
    }

    this.portalService.remove(this.dropdownBoxRef);
    this.dropdownBoxRef = null;
  }

  public ngAfterViewChecked(): void {
    if (this.dropdownBoxRef !== null) {
      this.dropdownBoxRef.changeDetectorRef.detectChanges();
      this.dropdownBoxRef.changeDetectorRef.markForCheck();
    }
  }
}
