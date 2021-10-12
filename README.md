# JS router


## How to use 

import to project, for example

`import Router from '/libraries/router.js';`

#### Change route 

`Router.change('/post/:id');`


#### Define routes

```
Router.on('/project', (event) => {
    document.body.replaceWith(newElement)
});

```

** Using * wildcard route**

Wildcard * accepts any route pattern

```
Router.on('/user/*/posts', (event) => {
    console.log(event.path[1])  
});
```

** Using parameter :value **

Using :value, retrives the value as parameter when parsing route

```
Router.on('/post/:id', (event) => {
    console.log(event.parameters.id)  
});
```

#### Parameters

Event parameters send along with route change event

* parameters
* path
* query