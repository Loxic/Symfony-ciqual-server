class ExpandableIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false, data: props.reactdata, innerData: {}};
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand(event) {
        if(this.state.expanded == false) {
            this.setState({expanded: true});
        }
        else {
            this.setState({expanded: false});
        }
        if(Object.keys(this.state.innerData).length == 0) {
            var id = this.state.data.id;
            var request = new Request('http://localhost:8080/api/ingredient/'+id);
            fetch(request)
                .then(response => response.json())
                .then(json => {
                this.setState({innerData: json});        
            });
        }
    }

    render() {
        var data = this.state.data;
        var innerData = this.state.innerData;
        var expanded = this.state.expanded;
        var description = [];
        if(expanded == true) {
            var i = 0;
            for (var prop in innerData) {
                if(innerData[prop] == "-" || innerData[prop] == 0) {
                    continue;
                }
                else if(prop == "ORIGFDCD" || prop == "ORIGFDNM" || prop == "ORIGGPCD" || prop == "ORIGGPFR") {
                    continue;
                }
                else {
                    description.push(
                        (<div className="ingredient-description" key={i}>
                            <span>{prop}:</span> <span>{innerData[prop]}</span>
                        </div>) );
                }
                i++;
            }
        }
        return (
            <li className="list-group-item">
                <a onClick={this.toggleExpand} className={"list-group-item list-group-item-action" + (expanded ? " active" : "")}><span>{data.origgpfr}</span> <span>{data.origfdnm}</span></a>
                {
                    expanded ? description : null
                }
            </li>
            );
    }
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', data: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        //var value = event.target.value;
    }
    handleSubmit(event) {
        event.preventDefault();        
        this.setState({data: []});
        var value = this.state.value;
        if(value != "") {
            var request = new Request('http://localhost:8080/api/ingredients/'+value);
            fetch(request)
                .then(response => response.json())
                .then(json => {
                this.setState({data: json});        
            });
        }
    }

    createList(data) {
        var rows = [];
        for (var i=0; i < data.length; i++) {
            //var element = (<li class="ingredient"><span class="ingredient-cat">{data[i].ORIGGPFR}</span> <span class="ingredient-name">{data[i].ORIGFDNM}</span></li>);
            var element = (<ExpandableIngredient key={i} reactdata={data[i]} /> );
            rows.push(element);
        }
        return (
            <div>
                <ul className="list-group">
                    {rows}
                </ul>
            </div>
        )
    }
    render() { 
        return (
            <div className="">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Rechercher un ingredient" />
                        <span className="input-group-btn">
                            <input className="btn btn-secondary" type="submit" value="Recherche" />
                        </span>
                    </div>  
                </form>
                {this.createList(this.state.data)}
            </div>
            );
    }
}



ReactDOM.render(
    <SearchForm />,
    document.getElementById('react-render-app')
);
