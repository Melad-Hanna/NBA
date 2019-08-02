import React, { Component } from 'react'
import axios from 'axios';
import { URL_Teams } from '../Utils/paths';

class Poll extends Component {
    state = {
        pollTeams: []    
    }

    getPollInfo = () => {
        axios.get(`${URL_Teams}?poll=true&_sort=count&_order=desc`)
        .then(response => {
            this.setState({ pollTeams: response.data });
        });
    }

    componentDidMount(){
        this.getPollInfo();
    }

    pollCountUp(team){
        console.log(JSON.stringify({
            count: team.count + 1
        }));
        axios(`${URL_Teams}/${team.id}`,{
            method: 'PATCH',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                count: team.count + 1
            })
        })
        .then(()=>{
            this.getPollInfo();
        })
    }

    renderPoll = () => {
        return this.state.pollTeams.map((team, index) => (
                    <div
                        key={team.id}
                        className="poll_item"
                        onClick={() => this.pollCountUp(team)}
                    >
                        <img alt={team.team} src={`/images/teams/${team.logo}`} />
                        <h4>No. {index+1}</h4>
                        <div>{team.count} Votes</div>
                    </div>
                )) 
    }

    render() {
        return (
            <div className="home_poll">
                <h3>Who will be the next champion?!</h3>
                <div className="poll_container">
                    {this.renderPoll()}
                </div>
            </div>
        )
    }
}

export default Poll;