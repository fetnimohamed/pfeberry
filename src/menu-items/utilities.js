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
            url: '/utils/util-color',
            icon: icons['square-check'],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Task Models',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons['box-model-2'],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Components states',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons['components'],
            breadcrumbs: false
        }
    ]
};
