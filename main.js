class Router {
    constructor() {
        this.routes = new Map();
        this.current = [];
        
        // Listen to the route changes, and fire routeUpdate when route change happens.
        window.onpopstate = this.routeUpdate.bind(this);
    }
    
    // Returns the path in an array, for example URL "/blog/post/1" , will be returned as ["blog", "post", "1"]
    get path() {
        return window.location.pathname.split('/').filter((x) => x != '');
    }
    
    // Returns the pages query parameters as an object, for example "/post/?id=2" will return { id:2 } 
    get query() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    routeUpdate() {
        // Get path as an array and query parameters as an object
        const path = this.path;
        const query = this.query;
        
        // When URL has no path, fire the action under "/" listener and return 
        if (path.length == 0) {
            this.routes.get('/')(path);
            return;
        }

        // When same route is already active, don't render it again, may cause harmful loops.
        if (this.current.join() === path.join()) return;
        
        // Set active value of current page
        this.current = path;
        
        // Here I save the parameters of the URL, for example "/post/:page", will save value of page
        let parameters = {};
        
        // Loop though the saved route callbacks, and find the correct action for currect URL change
        for (let [route, callback] of this.routes) {
            
            // Split the route action name into array
            const routes = route.split('/').filter((x) => x != '');
            const matches = routes
                .map((url, index) => {
                    // When the route accepts value as wildcard accept any value
                    if (url == '*') return true;

                    // Route has a parameter value, because it uses : lets get that value from the URL
                    if (url.includes(':')) {
                        parameters[url.split(':')[1]] = path[index];
                        return true;
                    }
                    // The new URL matches the saved route callback url, return true, meaning the action should be activated.
                    if (url == path[index]) return true;
                    return false;
                })
                .filter((x) => x);
            
            // When the router has found that current URL, is matching the saved route name, fire the callback action with parameters included 
            if (matches.length == routes.length && routes.length > 0) {
                callback({ path, parameters, query });
            }
        }
    }
    
    // Listen for route changes, required route name and the callback function, when route matches.
    on(route, callback) {
        this.routes.set(route, callback);
    }
    
    // Fire this function when you want to change page, for example router.change("/user/1")
    // It will also save the route change to history api.
    change(route) {
        window.history.pushState({ action: 'changeRoute' }, null, route);
        window.dispatchEvent(new Event('popstate'));
    }
}

export default new Router();
