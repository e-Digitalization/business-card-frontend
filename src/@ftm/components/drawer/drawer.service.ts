import { Injectable } from '@angular/core';
import { FtmDrawerComponent } from '@ftm/components/drawer/drawer.component';

@Injectable({ providedIn: 'root' })
export class FtmDrawerService {
    private _componentRegistry: Map<string, FtmDrawerComponent> = new Map<
        string,
        FtmDrawerComponent
    >();

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: FtmDrawerComponent): void {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): FtmDrawerComponent | undefined {
        return this._componentRegistry.get(name);
    }
}
