import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import AllParties from './AllParties';
import { connect } from 'react-redux';
import AllConstituencies from './AllConstituencies';
import AllCandidates from './AllCandidates'
class EditDetailsButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parties: false,
            displayState: false,
            constituencies: false,
            candidates: false
        }
    }
    Parties = () => {
        this.props.props.history.push('/parties')
        this.setState({ parties: true, constituencies: false, candidates: false })

        const data = {
            view: this.state.displayState
        }
        this.props.dispatch({
            type: 'VIEW',
            data
        });
    }
    Constituencies = () => {
        this.props.props.history.push('/constituencies')
        this.setState({ constituencies: true, parties: false, candidates: false })

        const data = {
            view: this.state.displayState
        }
        this.props.dispatch({
            type: 'VIEW',
            data
        });
    }
    Candidates = () => {
        this.props.props.history.push('/candidates')
        this.setState({ constituencies: false, parties: false, candidates: true })

        const data = {
            view: this.state.displayState
        }
        this.props.dispatch({
            type: 'VIEW',
            data
        });
    }
    render() {
        return (
            <div>
                <div className="buttonsCss">
                    <div style={{ marginBottom: '6px', alignSelf: 'center' }}>
                        <Button onClick={this.Parties} variant="contained" color="secondary">
                            Party
                </Button>
                    </div>
                    <div style={{ marginRight: '6px', marginBottom: '6px', marginLeft: '6px', alignSelf: 'center' }}>
                        <Button onClick={this.Constituencies} variant="contained" color="secondary">
                            Constituency
                </Button>
                    </div>
                    <div style={{ alignSelf: 'center', marginBottom: '6px' }}>
                        <Button onClick={this.Candidates} variant="contained" color="secondary">
                            Candidate
                </Button>
                    </div>
                </div>
                <div>
                    {this.state.parties ? <AllParties></AllParties> : null}
                    {this.state.constituencies ? <AllConstituencies></AllConstituencies> : null}
                    {this.state.candidates ? <AllCandidates></AllCandidates> : null}
                </div>

            </div>


        )
    }
} export default connect()(EditDetailsButton)