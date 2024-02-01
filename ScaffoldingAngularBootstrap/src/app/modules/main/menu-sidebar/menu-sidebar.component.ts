import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import { User } from '@services/dto/User';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user: User;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    async ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = await this.appService.getProfile();
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt text-info',
        path: ['/']
    },
    {
      name: 'Expenses',
      iconClasses: 'fas fa-money-bill text-warning',
      path: ['/expenses']
    },
    {
      name: 'Receipts',
      iconClasses: 'fas fa-receipt text-success',
      path: ['/receipts']
    },
    {
      name: 'Categories',
      iconClasses: 'fas fa-ellipsis-h text-info',
      path: ['/categories']
    },
    {
        name: 'Import of Expenses',
        iconClasses: 'fas fa-copy text-info',
        path: ['/importofexpenses']
    },
    {
        name: 'Import of Receipts',
        iconClasses: 'fas fa-file text-info',
        path: ['/importofreceipts']
    },
    {
        name: 'Investiments',
        iconClasses: 'fas fa-chart-pie text-success',
        children: [
            {
                name: 'Swing Trade',
                iconClasses: 'far fa-circle text-info',
                path: ['/swingtrade']
            },
            {
              name: 'Dividend',
              iconClasses: 'far fa-circle text-info',
              path: ['/dividend']
            },
            {
                name: 'CDB',
                iconClasses: 'far fa-circle text-info',
                path: ['/cdb']
            },
            {
                name: 'JCP/DIV Registration',
                iconClasses: 'far fa-circle text-info',
                path: ['/registration']
            },
            {
              name: 'Stock History',
              iconClasses: 'far fa-circle text-info',
              path: ['/stockhistory']
            },
            {
              name: 'Global Stock Target',
              iconClasses: 'far fa-circle text-info',
              path: ['/globalstocktarget']
            },
            {
              name: 'ST Stock Target',
              iconClasses: 'far fa-circle text-info',
              path: ['/ststocktarget']
            }
        ]
    },
    {
        name: 'Backup File',
        iconClasses: 'fas fa-circle text-danger',
        path: ['/backup']
    },
    {
      name: 'Notes',
      iconClasses: 'fas fa-bell text-info',
      path: ['/notes']
    }
];
