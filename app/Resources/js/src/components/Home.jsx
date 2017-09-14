'use strict';

//import React from 'react';
//import ReactDOM from 'react-dom'
//import ES6Promise from 'es6-promise'

import SearchResults from './SearchResults.jsx'
import IngredientDetails from './IngredientDetails.jsx'

var SearchValues = {
    searchQuery: "",
    searchResults: [],
    ingredientData: [],
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            step: 1,
            searchQuery: "",
         };
        this.handleChange = this.handleChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    handleChange(event) {
        this.setState({searchQuery: event.target.value});
        SearchValues.searchQuery = event.target.value;
    }

    handleSubmit(event) {
        var value = SearchValues.searchQuery;
        var request = new Request('http://localhost:8080/api/ingredients/'+value);
        fetch(request)
            .then(response => response.json())
            .then(json => {
                SearchValues.searchResults = json;
                nextStep();
            });
        event.preventDefault();
 
    }

    nextStep() {
        console.log('kk');
        this.setState({step: this.state.step + 1});
    }
    prevStep() {
        this.setState({step: this.state.step - 1});
    }
    
    onStep() {
        switch(this.state.step) {
            case 1:
            return (
                <div>
                    <label>
                        <input type="text" value={this.state.searchQuery} onChange={this.handleChange} placeholder="Rechercher un ingredient" />
                    </label>
                    <button value="Recherche" onClick={this.handleSubmit}>Recherche</button>
                </div>
            );
            break;
            case 2:
            return (
                <searchResults />
            )
            break;
            case 3:
                <IngredientDetails />
            break;
        }
    }

    render() {
        return this.onStep();   
    }
}
