import React from 'react';
import Loadable from 'react-loadable';

import Loader from '../components/Loader';

function Loading() {
  return <Loader />;
}

const Dashboard = Loadable({
  loader: () => import('../modules/dashboard/views/index'),
  loading: Loading,
});

const Customers = Loadable({
  loader: () => import('../modules/customer/views/index'),
  loading: Loading
})

const CustomerProfile = Loadable({
  loader: () => import('../modules/customer/profile/index'),
  loading: Loading
})

const Segments = Loadable({
  loader: () => import('../modules/segment/view/index'),
  loading: Loading
})

const Campaigns = Loadable({
  loader: () => import('../modules/campaign/view/index'),
  loading: Loading
})

const CreateCampaigns = Loadable({
  loader: () => import('../modules/campaign/view/create'),
  loading: Loading
})

const CampaignPreview = Loadable({
  loader: () => import('../modules/campaign/components/campaign-preview'),
  loading: Loading
})

const Automations = Loadable({
  loader: () => import('../modules/automation/view/index'),
  loading: Loading
})
const Users = Loadable({
  loader: () => import('../modules/user/view/index'),
  loading: Loading
})
const Event = Loadable({
  loader: () => import('../modules/events/view/index'),
  loading: Loading
});

const Messages = Loadable({
  loader: () => import('../modules/messages/view/index'),
  loading: Loading
});

const CreateCustomer = Loadable({
  loader:() => import('../modules/customer/components/create'),
  loading:Loading
})

const CustomerBulkUpload = Loadable({
  loader:() => import('../modules/customer/components/bulk-upload'),
  loading:Loading
})

const EventBulkUpload = Loadable({
  loader:() => import('../modules/customer/components/events-bulk-upload'),
  loading:Loading
})
const LogReports = Loadable({
  loader:() => import('../modules/reports/components/commingsoon'),
  loading:Loading
})
const SummaryReports = Loadable({
  loader:() => import('../modules/reports/components/commingsoon'),
  loading:Loading
})

const InboxReports = Loadable({
  loader:() => import('../modules/reports/components/inboxReport'),
  loading:Loading
})

const CustomersSub = Loadable({
  loader: () => import('../modules/customer_sub/views/index'),
  loading: Loading
})

const CustomerProductsBulkUpload = Loadable({
  loader: () => import('../modules/customer_sub/components/customer-products-bulk-upload'),
  loading: Loading
})


const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true, isAuth: true },
  { path: '/customer', name: 'Customers', component: Customers, exact: true, isAuth: true },
  { path: '/customer_products', name: 'Customers', component: CustomersSub, exact: true, isAuth: true },
  { path: '/customer/profile/:id', name: 'Customers Profile', component: CustomerProfile, exact: true, isAuth: true },
  { path: '/customer/create', name: CreateCustomer, component: CreateCustomer, exact: true, isAuth: true },
  { path: '/customer/bulkupload', name: CustomerBulkUpload, component: CustomerBulkUpload, exact: true, isAuth: true },
  { path: '/segments', name: 'Segments', component: Segments, exact: true, isAuth: true },
  { path: '/segments/:id', name: 'Segments', component: Segments, exact: true, isAuth: true },
  { path: '/campaigns', name: 'Campaigns', component: Campaigns, exact: true, isAuth: true },
  { path: '/campaigns/create', name: 'Create Campaigns', component: CreateCampaigns, exact: true, isAuth: true },
  { path: '/campaigns/create/:id', name: 'Create Campaigns', component: CreateCampaigns, exact: true, isAuth: true },
  { path: '/campaigns/view', name: 'Create Preview', component: CampaignPreview, exact: true, isAuth: true },
  { path: '/automations', name: 'Automations', component: Automations, exact: true, isAuth: true },
  { path: '/users', name: 'Users', component: Users, exact: true, isAuth: true },
  { path: '/event', name: Event, component: Event, exact: true, isAuth: true },
  { path: '/messages', name: Messages, component: Messages, exact: true, isAuth: true },
  { path: '/event/bulkupload', name: EventBulkUpload, component: EventBulkUpload, exact: true, isAuth: true },
  { path: '/log-reports', name: LogReports, component: LogReports, exact: true, isAuth: true },
  { path: '/summary-reports', name: SummaryReports, component: SummaryReports, exact: true, isAuth: true },
  { path: '/inbox-reports', name: InboxReports, component: InboxReports, exact: true, isAuth: true },
  { path: '/customer_products/bulkupload', name: CustomerProductsBulkUpload, component: CustomerProductsBulkUpload, exact: true, isAuth: true },



];

export default routes;
