class Router {
    constructor() {
        this.routes = new Map();
        this.current = [];
        window.onpopstate = this.routeUpdate.bind(this);
    }

    get path() {
        return window.location.pathname.split('/').filter((x) => x != '');
    }

    get query() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    routeUpdate() {
        const path = this.path;
        const query = this.query;

        if (path.length == 0) {
            this.routes.get('/')(path);
            return;
        }

        // Its' same route return
        if (this.current.join() === path.join()) return;
        this.current = path;

        let parameters = {};

        for (let [route, callback] of this.routes) {
            const routes = route.split('/').filter((x) => x != '');
            const matches = routes
                .map((url, index) => {
                    if (url == '*') return true;
                    if (url.includes(':')) {
                        parameters[url.split(':')[1]] = path[index];
                        return true;
                    }
                    if (url == path[index]) return true;
                    return false;
                })
                .filter((x) => x);

            if (matches.length == routes.length && routes.length > 0) {
                callback({ path, parameters, query });
            }
        }
    }

    on(route, callback) {
        this.routes.set(route, callback);
    }

    change(route) {
        window.history.pushState({ action: 'changeRoute' }, null, route);
        window.dispatchEvent(new Event('popstate'));
    }
}

export default new Router();
