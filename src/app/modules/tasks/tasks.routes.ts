import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { TasksDetailsComponent } from './details/details.component';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './list/list.component';

const canDeactivateTasksDetails = (
    component: TasksDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }
    if (!nextState.url.includes('/tasks')) {
        return true;
    }
    if (nextRoute.paramMap.get('id')) {
        return true;
    }
    return component.closeDrawer().then(() => true);
};

export default [
    {
        path: '',
        component: TasksComponent,
        children: [
            {
                path: '',
                component: TasksListComponent,
                children: [
                    {
                        path: ':id',
                        component: TasksDetailsComponent,
                        canDeactivate: [canDeactivateTasksDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
