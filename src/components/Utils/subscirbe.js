import React, { Component } from 'react';
import axios from 'axios';
import { URL_Subscriptions } from './paths';

// import { URL_Subscriptions } from 'paths';

class Subscirbe extends Component {
    state = {
        email: '',
        error: false,
        success: false,
        alreadyIn: false
        // inputValid: ''
    }

    clearMessages = () => {
        setTimeout(()=>{
            this.setState({
                error: false,
                success: false,
                alreadyIn: false
            });
        }, 3000);
    }
    
    saveSubscription = (email) => {
        axios.get(`${URL_Subscriptions}?email=${email}`)
        .then(response => {
            if(!response.data.length){
                axios(URL_Subscriptions,{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({email})
                })
                .then(response => {
                    this.setState({
                        email: '',
                        success: true
                    })
                });
            }
            else
                this.setState({
                    email: '',
                    alreadyIn: true
                });

            this.clearMessages();
        });
    }

    submitSubscription = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex.test(email)){
            this.saveSubscription(email);
        }
        else
            this.setState({error: true});

        this.clearMessages();
    }

    emailIn = (event) => {
        this.setState({email: event.target.value});
    }

    render() {
        const state = this.state;
        return (
            <div className="subcribe_panel">
                <h3>Subscribe to us</h3>
                <div>
                    <form onSubmit={this.submitSubscription}>
                        <input 
                            type="text" 
                            value={state.email}
                            placeholder="your email" 
                            onChange={this.emailIn} />
                            {/* <div className={`${state.error || state.success || state.alreadyIn ? "show" : " "}
                                 ${state.error ? "error " : " "}
                                 ${state.success ? "success " : " "}
                                 ${state.alreadyIn ? "alreadyIn " : " "}`}>
                                blah blah
                            </div> */}
                            <div className={state.error ? "error show" : "error"}>Check your email</div>
                            <div className={state.success ? "success show" : "success"}>Successfully regiesterd subscription</div>
                            <div className={state.alreadyIn ? "success show" : "success"}>Already subscribed</div>
                    </form>
                </div>
                <small>
                    subscribe to our website to get all new staff about your favourite NBA teams and players.
                </small>
            </div>
        )
    }
}

export default Subscirbe;