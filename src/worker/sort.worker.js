/*eslint-disable no-restricted-globals*/
/*eslint-disable no-undef*/

export default () => {
    self.addEventListener('message', e => {
        if (!e) return;
        if (e.data.list.length > 0) {
            self.importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js');
            let newList = _.sortBy(e.data.list, [e.data.sortBy]);
            if (e.data.sortDirection === e.data.SortDirectionDESC) {
                newList.reverse();
            }
            postMessage(newList);
        }
    });
}