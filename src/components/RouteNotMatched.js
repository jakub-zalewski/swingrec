import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const timeToRedirect = 2000;

class RouteNotMatched extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.location.pathname,
            redirect: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.state,
                redirect: true
            })
        }, timeToRedirect);
    }


    render() {
        const redirect = this.state.redirect ? <Redirect to="/"/> : '';

        return (
            <div>
                <h3><code>{this.state.location}</code> - route not matched. Redirecting to home page...</h3>
                {redirect}
            </div>
        )
    }
};

export default RouteNotMatched;
