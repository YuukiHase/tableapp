import { combineReducers } from 'redux';
import ListRender from './ListRender';
import ManageMenu from './ManageMenu';
import Deal from './Deal';
import Languages from './Languages';

const myReducers = combineReducers({
    list: ListRender,
    manageMenu: ManageMenu,
    deal: Deal,
    languages: Languages
});

export default myReducers;