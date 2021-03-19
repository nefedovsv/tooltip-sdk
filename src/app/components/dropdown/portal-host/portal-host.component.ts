import {
  Component,
  ComponentFactory,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Injector,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PortalService } from '../../../services/portal.service';

@Component({
  selector: 'app-portal-host',
  templateUrl: './portal-host.component.html',
  styleUrls: ['./portal-host.component.scss']
})


export class PortalHostComponent  {

  constructor(
    @Inject(ViewContainerRef) private readonly viewContainerRef: ViewContainerRef,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(PortalService) portalService: PortalService,
  ) {
    portalService.attach(this);
  }

  get clientRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  addComponentChild<C>(
    componentFactory: ComponentFactory<C>,
    injector: Injector,
  ): ComponentRef<C> {
    return this.viewContainerRef.createComponent<C>(
      componentFactory,
      undefined,
      Injector.create({
        parent: injector,
        providers: [
          {
            provide: PortalHostComponent,
            useValue: this,
          },
        ],
      }),
    );
  }

  addTemplateChild<C>(templateRef: TemplateRef<C>, context?: C): EmbeddedViewRef<C> {
    return this.viewContainerRef.createEmbeddedView(templateRef, context);
  }
}
