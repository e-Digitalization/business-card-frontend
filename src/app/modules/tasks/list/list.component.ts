import {
    CdkDrag,
    CdkDragDrop,
    CdkDragHandle,
    CdkDragPreview,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DOCUMENT, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    AfterViewInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';

import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { Tag, Task } from '../tasks.types';
import { TasksService } from '../tasks.service';
import { FtmMediaWatcherService } from '@ftm/services/media-watcher';
import { FtmNavigationService, FtmVerticalNavigationComponent } from '@ftm/components/navigation';
import { DrawerShellComponent } from 'app/shared/drawer-shell/drawer-shell.component';

@Component({
    selector: 'tasks-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatSidenavModule,
        RouterOutlet,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        CdkDropList,
        CdkDrag,
        NgClass,
        CdkDragPreview,
        CdkDragHandle,
        RouterLink,
        TitleCasePipe,
        DatePipe,
        DrawerShellComponent,
    ],
})
export class TasksListComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';
    drawerSize: 'half' | 'full' = 'half';
    preferredDrawerSize: 'half' | 'full' = 'half';
    selectedTask: Task;
    tags: Tag[];
    tasks: Task[];
    tasksCount: any = {
        completed: 0,
        incomplete: 0,
        total: 0,
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _tasksService: TasksService,
        private _ftmMediaWatcherService: FtmMediaWatcherService,
        private _ftmNavigationService: FtmNavigationService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Ensure data is loaded without route resolvers
        this._tasksService
            .getTags()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();

        this._tasksService
            .getTasks()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();

        // Initialize drawer preference from initial query params
        const initialSize = this._activatedRoute.snapshot.queryParamMap.get('size');
        if (initialSize === 'half' || initialSize === 'full') {
            this.preferredDrawerSize = initialSize;
            this.drawerSize = initialSize;
        }

        // Get the tags
        this._tasksService.tags$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tags: Tag[]) => {
                this.tags = tags ?? [];

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the tasks
        this._tasksService.tasks$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks ?? [];

                // Update the counts
                this.tasksCount.total = this.tasks.filter(
                    (task) => task.type === 'task'
                ).length;
                this.tasksCount.completed = this.tasks.filter(
                    (task) => task.type === 'task' && task.completed
                ).length;
                this.tasksCount.incomplete =
                    this.tasksCount.total - this.tasksCount.completed;

                // Mark for check
                this._changeDetectorRef.markForCheck();

                // Update the count on the navigation
                setTimeout(() => {
                    // Get the component -> navigation data -> item
                    const mainNavigationComponent =
                        this._ftmNavigationService.getComponent<FtmVerticalNavigationComponent>(
                            'mainNavigation'
                        );

                    // If the main navigation component exists...
                    if (mainNavigationComponent) {
                        const mainNavigation =
                            mainNavigationComponent.navigation;
                        const menuItem = this._ftmNavigationService.getItem(
                            'apps.tasks',
                            mainNavigation
                        );

                        // Update the subtitle of the item if exists
                        if (menuItem) {
                            menuItem.subtitle =
                                this.tasksCount.incomplete + ' remaining tasks';

                            // Refresh the navigation
                            mainNavigationComponent.refresh();
                        }
                    }
                });
            });

        // Get the task
        this._tasksService.task$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((task: Task) => {
                this.selectedTask = task;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Read optional drawer size from query params to allow caller control
        this._activatedRoute.queryParamMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) => {
                const size = params.get('size');
                if (size === 'half' || size === 'full') {
                    this.preferredDrawerSize = size;
                    this.drawerSize = size;
                    this._changeDetectorRef.markForCheck();
                }
            });

        // Subscribe to media changes and toggle drawer mode similar to Notes
        this._ftmMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                const isLarge = matchingAliases.includes('lg') || matchingAliases.includes('xl');
                if (isLarge) {
                    if (this.preferredDrawerSize === 'half') {
                        // Half width behaves as side panel on large screens
                        this.drawerMode = 'side';
                        this.drawerSize = 'half';
                    } else {
                        // Full width should behave as overlay to not collapse content
                        this.drawerMode = 'over';
                        this.drawerSize = 'full';
                    }
                } else {
                    // Small screens: overlay full width
                    this.drawerMode = 'over';
                    this.drawerSize = 'full';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(
                    (event) =>
                        (event.ctrlKey === true || event.metaKey) && // Ctrl or Cmd
                        (event.key === '/' || event.key === '.') // '/' or '.' key
                )
            )
            .subscribe((event: KeyboardEvent) => {
                // If the '/' pressed
                if (event.key === '/') {
                    this.createTask('task');
                }

                // If the '.' pressed
                if (event.key === '.') {
                    this.createTask('section');
                }
            });

    }

    /**
     * After view init
     */
    ngAfterViewInit(): void { }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create task
     *
     * @param type
     */
    createTask(type: 'task' | 'section'): void {
        // Create the task
        this._tasksService.createTask(type).subscribe((newTask) => {
            // Go to the new task
            this._router.navigate(['./', newTask.id], {
                relativeTo: this._activatedRoute,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Toggle the completed status
     * of the given task
     *
     * @param task
     */
    toggleCompleted(task: Task): void {
        // Toggle the completed status
        task.completed = !task.completed;

        // Update the task on the server
        this._tasksService.updateTask(task.id, task).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Task dropped
     *
     * @param event
     */
    dropped(event: CdkDragDrop<Task[]>): void {
        // Move the item in the array
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        // Save the new order
        this._tasksService.updateTasksOrders(event.container.data).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
