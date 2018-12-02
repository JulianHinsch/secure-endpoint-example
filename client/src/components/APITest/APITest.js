import React, { Component } from 'react';
import axios from 'axios';

export default class APIAuthTest extends Component {
    
    state = {
        loading: false,
        error: null,
        data: undefined,
    }

    async componentDidMount() {
        let url = process.env.NODE_ENV === 'production' 
            ? '/api/test' 
            : 'http://localhost:3001/api/test';
        this.setState({ loading: true }, async () => {
            try {
                let result = await axios.get(url);
                this.setState({ loading: false, data: result.data });
            } catch (err) {
                console.log(err);
                this.setState({ loading: false, error: err});
            }
        })
        
    }
    
    render() {
        const { loading, error, data } = this.state;
        return (
            <p>
                {loading 
                    ? 'Loading...'
                : error 
                    ? error.message 
                : data}
            </p>
        )
        
    }
}