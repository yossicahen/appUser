//**** APP COMPONENT ****//

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './containers/Dashboard'
import Login from './containers/Login';
const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/dashboard' component={Dashboard}/>

        </Switch>
    )
}

export default App;