import React, {Component} from 'react';

function withService(service, title) {
    return function(Todo) {
        return class extends Component {
            render() {
                return <Todo service={service} title={title} {...this.props} />
            }
        }
    }
}

export default withService;