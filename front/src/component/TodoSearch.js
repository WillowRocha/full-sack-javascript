import React, {Component} from  'react';


class TodoSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: ''
        }
    }

    inputChange(e) {
        this.setState({inputText: e.target.value});
    }

    clearInput() {
        this.setState({inputText: ''});
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onInsert(this.state.inputText);
        this.clearInput();
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitForm.bind(this)}>
                    <div className="form-group">
                        <input className="form-control" value={this.state.inputText} onChange={this.inputChange.bind(this)}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default TodoSearch;
