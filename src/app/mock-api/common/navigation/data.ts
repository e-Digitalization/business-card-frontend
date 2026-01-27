/* eslint-disable */
import { FtmNavigationItem } from '@ftm/components/navigation';

const longMenu: FtmNavigationItem[] = [
    { id: 'dashboard', title: 'Dashboard', type: 'basic', icon: 'heroicons_outline:home', link: '/dashboard' },
    { id: 'chf', title: 'CHF', type: 'collapsable', icon: 'heroicons_outline:briefcase', children: [
        { id: 'chf-overview', title: 'Overview', type: 'basic', link: '/chf/overview' },
        { id: 'chf-claims', title: 'Claims', type: 'basic', link: '/chf/claims' },
    ]},
    { id: 'ncd', title: 'NCD', type: 'collapsable', icon: 'heroicons_outline:beaker', children: [
        { id: 'ncd-screening', title: 'Screening', type: 'basic', link: '/ncd/screening' },
        { id: 'ncd-followup', title: 'Follow-up', type: 'basic', link: '/ncd/follow-up' },
    ]},
    { id: 'prime-vendor', title: 'Prime Vendor', type: 'collapsable', icon: 'heroicons_outline:building-storefront', children: [
        { id: 'pv-orders', title: 'Orders', type: 'basic', link: '/pv/orders' },
        { id: 'pv-invoices', title: 'Invoices', type: 'basic', link: '/pv/invoices' },
    ]},
    { id: 'bills', title: 'Payments', type: 'collapsable', icon: 'heroicons_outline:banknotes', children: [
        { id: 'bills-list', title: 'Bills', type: 'basic', link: '/bills' },
        { id: 'bills-receipts', title: 'Receipts', type: 'basic', link: '/bills/receipts' },
    ]},
    { id: 'ot', title: 'Theater', type: 'collapsable', icon: 'heroicons_outline:scissors', children: [
        { id: 'ot-schedule', title: 'Schedule', type: 'basic', link: '/ot/schedule' },
        { id: 'ot-theaters', title: 'Theaters', type: 'basic', link: '/ot/theaters' },
    ]},
    { id: 'outpatient', title: 'Outpatient', type: 'collapsable', icon: 'heroicons_outline:user-circle', children: [
        { id: 'op-consultation', title: 'Consultation', type: 'basic', link: '/outpatient/consultation' },
        { id: 'op-triage', title: 'Triage', type: 'basic', link: '/outpatient/triage' },
        { id: 'op-pharmacy', title: 'Pharmacy', type: 'basic', link: '/outpatient/pharmacy' },
        { id: 'op-labs', title: 'Laboratory', type: 'basic', link: '/outpatient/labs' },
        { id: 'op-performance', title: 'Performance', type: 'basic', link: '/outpatient/performance' },
    ]},
    { id: 'consultation', title: 'Consultation', type: 'basic', icon: 'heroicons_outline:chat-bubble-left-right', link: '/consultation' },
    { id: 'performance', title: 'Performance', type: 'basic', icon: 'heroicons_outline:clock', link: '/performance' },
    { id: 'timr', title: 'TImR', type: 'collapsable', icon: 'heroicons_outline:beaker', children: [
        { id: 'timr-register', title: 'Register', type: 'basic', link: '/timr/register' },
        { id: 'timr-schedule', title: 'Schedule', type: 'basic', link: '/timr/schedule' },
    ]},
    { id: 'client-mgmt', title: 'Clients', type: 'collapsable', icon: 'heroicons_outline:identification', children: [
        { id: 'client-list', title: 'Clients', type: 'basic', link: '/clients' },
        { id: 'client-programs', title: 'Programs', type: 'basic', link: '/clients/programs' },
    ]},
    { id: 'rch', title: 'RCH', type: 'collapsable', icon: 'heroicons_outline:sparkles', children: [
        { id: 'rch-anc', title: 'ANC', type: 'basic', link: '/rch/anc' },
        { id: 'rch-pnc', title: 'PNC', type: 'basic', link: '/rch/pnc' },
    ]},
    { id: 'inpatient', title: 'Inpatient', type: 'collapsable', icon: 'heroicons_outline:user-group', children: [
        { id: 'ip-admissions', title: 'Admissions', type: 'basic', link: '/inpatient/admissions' },
        { id: 'ip-wards', title: 'Wards', type: 'basic', link: '/inpatient/wards' },
        { id: 'ip-discharges', title: 'Discharges', type: 'basic', link: '/inpatient/discharges' },
    ]},
    { id: 'pharmacy', title: 'Pharmacy', type: 'collapsable', icon: 'heroicons_outline:shopping-bag', children: [
        { id: 'pharmacy-stocks', title: 'Stocks', type: 'basic', link: '/pharmacy/stocks' },
        { id: 'pharmacy-issues', title: 'Issues', type: 'basic', link: '/pharmacy/issues' },
        { id: 'pharmacy-reports', title: 'Reports', type: 'basic', link: '/pharmacy/reports' },
    ]},
    { id: 'finance', title: 'Finance', type: 'group' },
    { id: 'revenues', title: 'Revenues', type: 'basic', icon: 'heroicons_outline:arrow-trending-up', link: '/finance/revenues' },
    { id: 'expenses', title: 'Expenses', type: 'basic', icon: 'heroicons_outline:arrow-trending-down', link: '/finance/expenses' },
    { id: 'reports', title: 'Reports', type: 'collapsable', icon: 'heroicons_outline:document-chart-bar', children: [
        { id: 'reports-daily', title: 'Daily', type: 'basic', link: '/reports/daily' },
        { id: 'reports-monthly', title: 'Monthly', type: 'basic', link: '/reports/monthly' },
        { id: 'reports-annual', title: 'Annual', type: 'basic', link: '/reports/annual' },
    ]},
    { id: 'admin', title: 'Admin', type: 'group' },
    { id: 'users', title: 'Users', type: 'basic', icon: 'heroicons_outline:user', link: '/admin/users' },
    { id: 'roles', title: 'Roles & Permissions', type: 'basic', icon: 'heroicons_outline:key', link: '/admin/roles' },
    { id: 'settings', title: 'Settings', type: 'basic', icon: 'heroicons_outline:cog-8-tooth', link: '/admin/settings' },
];

export const defaultNavigation: FtmNavigationItem[] = longMenu;

// For compact appearance, show parent items as ASIDE so children open in the flyout panel
const toCompact = (items: FtmNavigationItem[]): FtmNavigationItem[] =>
    items.map((i) =>
        i && 'children' in i && Array.isArray((i as any).children)
            ? ({ ...i, type: 'aside' as const })
            : i
    );

export const compactNavigation: FtmNavigationItem[] = toCompact(longMenu);
export const futuristicNavigation: FtmNavigationItem[] = longMenu;
export const horizontalNavigation: FtmNavigationItem[] = longMenu;
