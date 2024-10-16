import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'bx-home-circle',
        link: '/feature/dashboard',
    },
    {
        id: 3,
        icon: 'bx-user',
        label: 'User',
        subItems: [
            {
                id: 331,
                label: 'User Create',
                link: '/settings/user/user-create/0',
                parentId: 31
            },
            {
                id: 332,
                label: 'User List',
                link: '/settings/user/user-list',
                parentId: 32
            }
        ]
    },
    {
        id: 4,
        icon: 'bx-user',
        label: 'Organization',
        subItems: [
            {
                id: 365,
                label: 'Organization List',
                link: '/settings/organization/organization-list',
                parentId: 41
            }
        ]
    },
    {
        id: 5,
        icon: 'bx-cog',
        label: 'Setup',
        subItems: [
            {
                id: 441,
                label: 'Permission',
                link: '/settings/permission',
                parentId: 41
            },
            {
                id: 442,
                label: 'User Role',
                link: '/settings/user-role',
                parentId: 41
            },
            {
                id: 443,
                label: 'Global Setting',
                link: '/settings/global-setting',
                parentId: 41
            },
            {
                id: 443,
                label: 'Notification Area',
                link: '/settings/notification-area',
                parentId: 41
            },
            // {
            //     id: 443,
            //     label: 'User Role',
            //     link: '/settings/user-role',
            //     parentId: 41
            // },
        ]
    },
];

