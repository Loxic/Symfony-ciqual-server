class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'hello config'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        alert('test');
        event.preventDefault();
    }
    render() { 
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            );
    }
}
ReactDOM.render(
    <SearchForm />,
    document.getElementById('wrapper')
);