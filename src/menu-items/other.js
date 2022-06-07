// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconCpu, IconFriends, IconBuilding, IconCalendarEvent, IconUser } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconCpu: IconCpu,
    IconFriends: IconFriends,
    IconBuilding: IconBuilding,
    IconCalendarEvent: IconCalendarEvent,
    IconUser: IconUser
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'Settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        },
        // {
        //     id: 'Systems',
        //     title: 'Systems',
        //     type: 'item',
        //     url: '/System',
        //     icon: icons['IconCpu'],
        //     breadcrumbs: false
        // },
        {
            id: 'Groups',
            title: 'Groups',
            type: 'item',
            url: '/group',
            icon: icons['IconFriends'],
            breadcrumbs: false
        },
        //  {
        //     id: 'Departements',
        //     title: 'Departements',
        //     type: 'item',
        //     url: '/departement',
        //     icon: icons['IconBuilding'],
        //     breadcrumbs: false
        // },
        //    {
        //     id: 'weeks',
        //     title: 'dispatch plan ',
        //     type: 'item',
        //     url: '/weeks',
        //     icon: icons['IconCalendarEvent'],
        //     breadcrumbs: false
        // },
        {
            id: 'users',
            title: 'users',
            type: 'item',
            url: '/users',
            icon: icons['IconUser'],
            breadcrumbs: false
        }
    ]
};
