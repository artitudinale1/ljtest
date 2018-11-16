import Home from '@material-ui/icons/Home';
import ViewList from '@material-ui/icons/ViewList';
import {LoginPage, HomePage, AssetsPage} from '../components';

/*
 * Routes added here will automatically be registered to the router.
 * Setting private to true will render as an option in the side bar with
 * the specified icon, false and the route will not render.
 */

export const routes = [
  {
    path: '/',
    component: HomePage,
    label: 'Home',
    icon: Home,
    private: true,
  },
  {
    path: '/login',
    component: LoginPage,
    label: 'Log In',
    icon: null,
    private: false,
  },
  {
    path: '/assets',
    component: AssetsPage,
    label: 'Assets',
    icon: ViewList,
    private: true,
  },
];
