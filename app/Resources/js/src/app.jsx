'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx'

/**
 * Render Home
 */
let renderHome = () => {
    const render = document.getElementById("react-render-app");
    if(render) {
        ReactDOM.render(<Home />, render);
    }
}
renderHome();
