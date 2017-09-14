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
            for (var prop in innerData) {
                console.log(prop);
                if(data[prop] == "-" || data[prop] == 0) {
                    continue;
                }
                else if(prop == "ORIGFDCD" || prop == "ORIGFDNM" || prop == "ORIGGPCD" || prop == "ORIGGPFR") {
                    continue;
                }
                else {
                    description.push(
                        (<div>
                            <span>{prop}</span> <span>{data[prop]}</span>
                        </div>) );
                }
            }
        }
        return (
            <li>
                <span>{data.origgpfr}</span> <span>{data.origfdnm}</span> <button onClick={this.toggleExpand}>Montrer</button>
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
        var value = this.state.value;
        var request = new Request('http://localhost:8080/api/ingredients/'+value);
        fetch(request)
            .then(response => response.json())
            .then(json => {
            this.setState({data: json});        
        });
        event.preventDefault();
    }

    createList(data) {
        var rows = [];
        for (var i=0; i < data.length; i++) {
            //var element = (<li class="ingredient"><span class="ingredient-cat">{data[i].ORIGGPFR}</span> <span class="ingredient-name">{data[i].ORIGFDNM}</span></li>);
            var element = (<ExpandableIngredient reactdata={data[i]} /> );
            rows.push(element);
        }
        return (
            <div>
                <ul>
                    {rows}
                </ul>
            </div>
        )
    }
    render() { 
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Rechercher un ingredient" />
                    </label>
                    <input type="submit" value="Submit" />
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
/*ReactDOM.render(
    <Results />,
    document.getElementByIdById('wrapper')
);*/