import React, { Component } from  'react';
import { makeDebounced } from '../utlis/debounce';

class SearchForm extends Component {

    constructor(props) {
        super(props);

        let debouncedHandler = makeDebounced(props.handler);

        this.state = {
            handler: debouncedHandler
        };
    }

    onChange(event) {
        this.state.handler(event.target.value);
    }

    render() {
        return (
            <form style={{marginTop: '15px'}}>
                <div className="form-group row">
                    <div className="col-lg-12">
                        <input type="text" className="form-control" onChange={this.onChange.bind(this)} placeholder="Search for dogs"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchForm;
