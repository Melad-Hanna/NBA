import React, { Component } from 'react'
import axios from 'axios'
import { URL_Teams } from '../Utils/paths'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

class Teams extends Component {
    state = {
        teams: [],
        filtered: [],
        keyword: ''
    }

    componentDidMount(){
        axios.get(URL_Teams)
        .then(response => {
            this.setState({
                teams: response.data,
                filtered: response.data
            })
        })
    }

    renderTeamsList = () =>(
        this.state.filtered.map((team, index)=>(
            <CSSTransition
                key={index}
                timeout={500}
                classNames="fade"
            >
                <Link
                    to={`/teams/${team.name}`}
                    className="team_item"
                >
                    <img alt={team.name} src={`/images/teams/${team.logo}`} />
                </Link>
            </CSSTransition>
        ))
    )

    searchForTeam = (event)=>{
        const keyword = event.target.value;
        if(keyword !== ''){
            const list = this.state.teams.filter(team => {
                return team.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            });
            this.setState({
                filtered: list,
                keyword: keyword
            });
        }
        else{
            this.setState({
                filtered: this.state.teams,
                keyword
            });
        }
    }

    render() {
        return (
            <div className="teams_component">
                <div className="teams_input">
                    <input 
                    type="text"
                    value={this.state.keyword}
                    placeholder="Search for a team"
                    onChange={event => this.searchForTeam(event)}
                    />
                </div>
                <div className="teams_container">
                    <TransitionGroup component="span">
                        {this.renderTeamsList()}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default Teams;