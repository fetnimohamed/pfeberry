// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography: IconTypography,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconWindmill: IconWindmill,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
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
};
