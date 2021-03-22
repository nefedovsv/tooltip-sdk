import {
  ComponentFactory,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { PortalHostComponent } from '../components/dropdown/portal-host/portal-host.component';

const NO_HOST = 'Portals cannot be used without TuiPortalHostComponent';


@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private host?: PortalHostComponent;

  private get safeHost(): PortalHostComponent {
    if (!this.host) {
      throw new Error(NO_HOST);
    }

    return this.host;
  }

  attach(host: PortalHostComponent): void {
    this.host = host;
  }

  add<C>(componentFactory: ComponentFactory<C>, injector: Injector): ComponentRef<C> {
    return this.safeHost.addComponentChild(componentFactory, injector);
  }

  remove<C>({hostView}: ComponentRef<C>): void {
    hostView.destroy();
  }

  addTemplate<C>(templateRef: TemplateRef<C>, context?: C): EmbeddedViewRef<C> {
    return this.safeHost.addTemplateChild(templateRef, context);
  }

  removeTemplate<C>(viewRef: EmbeddedViewRef<C>): void {
    viewRef.destroy();
  }
}
