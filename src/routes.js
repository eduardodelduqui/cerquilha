import Home from './views/home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Search from './views/Search';

export const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/signup', component: SignUp, name: 'signup'},
    { path: '/search/:term', component: Search, name: 'search', props: { hasSearchMenu: true}}
]


