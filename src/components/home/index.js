import React, { Component } from 'react';
import axios from 'axios';

import { URL_Home } from '../Utils/paths';
import SliderWidget from '../Utils/slider';
import Subscribe from '../Utils/subscirbe';
import Blocks from './blocks';
import Poll from './poll';

class Home extends Component{

    state = {
        home: ''
    }

    componentDidMount(){
        axios.get(URL_Home)
        .then(response => {
            this.setState({home: response.data});
        });
    }

    render(){
        return(
            <>
                <SliderWidget slides={this.state.home.slider}/>
                <Subscribe/>
                <Blocks blocks={this.state.home.blocks}/>
                <Poll/>
            </>
        )
    }

}
export default Home;