// assets
import {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconActivity,
    IconNotes,
    IconReportAnalytics,
    IconAdjustments
} from '@tabler/icons';

// constant
const icons = {
    IconKey: IconKey,
    IconReceipt2: IconReceipt2,
    IconBug: IconBug,
    IconBellRinging: IconBellRinging,
    IconPhoneCall: IconPhoneCall,
    IconActivity: IconActivity,
    IconNotes: IconNotes,
    IconReportAnalytics: IconReportAnalytics,
    IconAdjustments: IconAdjustments
};

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

export const pages = {
    id: 'Task ',
    title: 'Task ',
    caption: 'Task  ',
    type: 'group',
    children: [
        { id: 'util-myTASK', title: 'My Tasks', type: 'item', url: '/myTasks', icon: icons['IconActivity'], breadcrumbs: false },
        { id: 'util-allTask', title: 'All Tasks', type: 'item', url: '/tasks', icon: icons['IconNotes'], breadcrumbs: false },
        {
            id: 'util-allReports',
            title: 'All Reports',
            type: 'item',
            url: '/reports',
            icon: icons['IconReportAnalytics'],
            breadcrumbs: false
        },
        {
            id: 'Task Settings',
            title: 'Task Settings',
            type: 'collapse',
            icon: icons['IconAdjustments'],
            children: [
                {
                    id: 'util-typography',
                    title: 'Task themes',
                    type: 'item',
                    url: '/theme',
                    icon: icons['IconPalettes'],
                    breadcrumbs: false
                },
                {
                    id: 'util-color',
                    title: 'Task States',
                    type: 'item',
                    url: '/taskStates',
                    icon: icons['square-check'],
                    breadcrumbs: false
                },
                {
                    id: 'Task-Models',
                    title: 'Task Models',
                    type: 'item',
                    url: '/taskModels',
                    icon: icons['box-model-2'],
                    breadcrumbs: false
                },
                {
                    id: 'Components',
                    title: 'Components',
                    type: 'item',
                    url: '/component',
                    icon: icons['box-model-2'],
                    breadcrumbs: false
                },
                {
                    id: 'Components-states',
                    title: 'Components states',
                    type: 'item',
                    url: '/componentState',
                    icon: icons['components'],
                    breadcrumbs: false
                }
            ]
        }
    ]
};
