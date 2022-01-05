import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import TutorialEditable from './views/TutorialEditable';
import Tutorial from './views/Tutorial';
import Search from './views/Search';
import Profile from './views/Profile';
import MyTutorials from './views/MyTutorials';
import UserTutorials from './views/UserTutorials';
import PageNotFound from './views/PageNotFound';
import MyFavorites from './views/MyFavorites';

export const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/signup', component: SignUp, name: 'signup'},
    { path: '/search/:term', component: Search, name: 'search'},
    { path: '/tutorials/new', component: TutorialEditable, name: 'create-tutorial', meta: {protected: true}},
    { path: '/tutorials/:id/edit', component: TutorialEditable, name: 'edit-tutorial', meta: {protected: true}},
    { path: '/tutorials/:id', component: Tutorial, name: 'tutorial'},
    { path: '/profile/', component: Profile, name: 'profile', meta: {protected: true}},
    { path: '/profile/tutorials', component: MyTutorials, name: 'my-tutorials', meta: {protected: true}},
    { path: '/user/:username/tutorials', component: UserTutorials, name: 'user-tutorials'},
    { path: '/profile/favorites', component: MyFavorites, name: 'favorite-list', meta: {protected: true}},
    { path:  '*', component: PageNotFound, name: 'page-not-found'},
]


