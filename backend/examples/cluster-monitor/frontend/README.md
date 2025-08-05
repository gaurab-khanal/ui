# Plugin System Frontend

This provides the Frontend System for Plugin. The Frontend System act as a React library where it has one single main file(App.jsx) in this case which is exported and is build. The build file is stored at /dist/filename.js which is actually a React component. It is loaded by Plugin Loader by host frontend application.

The `vite.config.js` is there to setup build for the project. It is customized to support host application and is made to make build system where it exports only one `.js` file which is loaded at frontend host app.

For using any kind of React hook, always use it like React.hookName example `React.useState(), React.useEffect()`.

In development mode reference React as
```
import React from "react";

const App = ()=>{

    const [mode, setMode] = React.useState("dev");

    return (
        <div> 
        {mode}
        </div>
    )
}
```

In build mode reference React as
```
const React = window.React

const App = ()=>{

    const [mode, setMode] = React.useState("dev");

    return (
        <div> 
        {mode}
        </div>
    )
}
```

## Development
Start the project
```
npm install
npm run dev
```

## Build
```
npm run build
```
