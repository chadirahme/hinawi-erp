import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'My Dashboard',
    icon: 'ion-heart',
    link: '/pages/favdashboard',
    home: true,
  },
  {
    title: 'Balances Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: false,
  },
  {
    title: 'Chart Dashboard',
    icon: 'nb-bar-chart',
    link: '/pages/chartdashboard',
    home: false,
  },
  {
    title: 'School Dashboard',
    icon: 'nb-e-commerce',
    link: '/pages/schooldashboard',
    home: false,
  },
  {
    title: 'Lists',
    icon: 'nb-list',
    children: [
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
    title: 'Help & Support',
    icon: 'nb-audio',
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
