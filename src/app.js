import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer'
import Home from './components/home/index';
import Teams from './components/teams/index';
import Team from './components/teams/team';

const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/teams/:name" component={Team} />
                <Route path="/teams" component={Teams} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;