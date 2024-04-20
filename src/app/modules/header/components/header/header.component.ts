import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    profileItems: MenuItem[] | undefined;
    menuItems: MenuItem[] | undefined;

    ngOnInit() {
        this.profileItems = [
            {
                label: 'Profile'
            },
            {
                label: 'My ratings'
            },
            {
                label: 'My lists'
            },
            {
                label: 'Sign out'
            }
        ];

        this.menuItems = [
            {
                label: 'Now playing'
            },
            {
                label: 'Popular'
            },
            {
                label: 'Top rated'
            },
            {
                label: 'Upcoming'
            },
            {
                label: 'Genres'
            }
        ];
    }
}