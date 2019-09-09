import { NbMenuItem } from '@nebular/theme';

const userRole = localStorage.getItem('role');
function findRole(allowedRole) {
return userRole === allowedRole;
}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'My Dashboard',
    icon: 'ion-heart',
    link: '/pages/favdashboard',
    home: true,
  },

  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Sales Data',
        link: '/pages/realestate/sales-chart',
      },
      {
        title: 'Profit Data',
        link: '/pages/realestate/profit-chart',
      },
      {
        title: 'Company Data',
        link: '/pages/chartdashboard',
      },
      {
        title: 'Realestate Status',
        link: '/pages/realestate/status-chart',
      },
      {
        title: 'Realestate Flat Type',
        link: '/pages/realestate/flattype-chart',
      },
      {
        title: 'Realestate Monthly Sales',
        link: '/pages/realestate/monthly-sales-chart',
      },
      {
        title: 'School',
        link: '/pages/schooldashboard',
      },
    ]
  },
  // {
  //   title: 'Balances Dashboard',
  //   icon: 'nb-home',
  //   link: '/pages/dashboard',
  //   home: false,
  // },
  // {
  //   title: 'Chart Dashboard',
  //   icon: 'nb-bar-chart',
  //   link: '/pages/chartdashboard',
  //   home: false,
  // },
  // {
  //   title: 'School Dashboard',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/schooldashboard',
  //   home: false,
  // },
  {
    title: 'Lists',
    icon: 'nb-list',
    children: [
      {
        title: 'General List',
        link: '/pages/lists/general-list',
      },
      {
        title: 'Customers List',
        link: '/pages/lists/customers-list',
      },
      {
        title: 'Prospective List',
        link: '/pages/lists/prospective-list',
      },
      {
        title: 'Vendors List',
        link: '/pages/lists/vendors-list',
      },
      {
        title: 'Students List',
        link: '/pages/lists/students-list',
      },
      {
        title: 'Mobile Attendance',
        link: '/pages/lists/mobile-attendance',
      },
    ]
  },

  {
    title: 'Accounting',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'Petty Cash Chart',
        link: '/pages/accounting/pettycashchart',
      },
      {
        title: 'Petty Cash Report',
        link: '/pages/accounting/pettycash',
      },

      {
        title: 'Approve Purchase Orders',
        link: '/pages/accounting/po',
      },
      // {
      //   title: 'Approve Cheques Issued',
      //   link: '/pages/lists/vendors-list',
      // },
    ]
  },

  //realestate

  {
    title: 'Reports',
    icon: 'nb-tables',
    children: [
      {
        title: 'Cheques Under Collection',
        link: '/pages/accounting/cuc',
      },
      // {
      //   title: 'Cheque Payment Report',
      //   link: '/pages/lists/prospective-list',
      // },
      // {
      //   title: 'All Payments Report',
      //   link: '/pages/lists/vendors-list',
      // },
    ]
  },

  {
    title: 'Help & Support',
    icon: 'nb-audio',
    hidden:!findRole('Admin'),
    children: [
      {
        title: 'YouTube',
        link: '/pages/help/youtube-list',
      },
    ]
  },

  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },

];
