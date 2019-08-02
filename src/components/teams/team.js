import React, { Component } from 'react'
import axios from 'axios';
import { URL_Teams } from '../Utils/paths';

class Team extends Component{

    state = {
        data: {}
    }

    componentDidMount(){
        axios.get(`${URL_Teams}?name=${this.props.match.params.name}`)
        .then(response =>{
            this.setState({
                data: response.data[0]
            });
        });
    }

    renderData = ()=>{
        let data = this.state.data;
        return(
            data ?
                <div className="team_data_wrapper">
                    <div className="left">
                        <img alt={data.name} src={`/images/teams/${data.logo}`} />
                    </div>
                    <div className="right">
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                        <br/>
                        <div className="squad">
                            {(
                                data.squad ?
                                    data.squad.map(item=>(
                                        <div key={item.name} className="item player-wrapper">
                                            <img alt={item.name} src={`/images/avatar.png`} />
                                            <h4>{item.name}</h4>
                                        </div>
                                    ))
                                    :null
                            )}
                        </div>
                    </div>
                </div>
            
            :
            null
        )
    }

    render(){
        console.log(this.state.data);
        return(
            <div className="team_data">
                {this.renderData()}
            </div>
        )
    }
}

export default Team;