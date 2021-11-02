
## How to use 

import to project

```javascript
import Router from '/libraries/router.js';
```

#### Change route 

```javascript
Router.change('/post/1');
```


#### Define routes

```javascript
Router.on('/project', (event) => {
    document.body.replaceWith(newElement)
});

```

Using wildcard route, * accepts any value

```javascript
Router.on('/user/*/posts', (event) => {
    console.log(event.path[1])  
});
```

Using parameter :value 

Using **:value**, retrives the :id as parameter when parsing route

```javascript
Router.on('/post/:id', (event) => {
    console.log(event.parameters.id)  
});
```

Route changes can also be listened with

```javascript
window.addEventListener('popstate', (event) => {});
```

#### Parameters

Event parameters send along with route change event

* parameters
* path
* query
