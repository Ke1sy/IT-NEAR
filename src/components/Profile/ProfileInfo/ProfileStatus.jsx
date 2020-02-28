import React, {Component} from 'react';

class ProfileStatus extends Component {
    state = {
        isEditing: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    changeMode = (val) => {
        this.setState({
            isEditing: val
        });
        if (!val) {
            this.props.setUserStatus(this.state.status)
        }
    };

    handleChange = ({target: {value}}) => {
        this.setState({
            status: value
        });
    };


    render() {
        const {status, isEditing} = this.state;
        return (
            <div className="status">
                {!isEditing &&
                <p onDoubleClick={() => this.changeMode(true)}>
                    <b>Status: </b>
                    <span>{status}</span>
                </p>
                }
                {isEditing &&
                <input
                    type="text"
                    autoFocus={true}
                    value={status}
                    onChange={this.handleChange}
                    onBlur={() => this.changeMode(false)}/>
                }
            </div>
        )
    }
};

export default ProfileStatus;
