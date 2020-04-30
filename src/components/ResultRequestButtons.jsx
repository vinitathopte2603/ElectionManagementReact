import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ConstituencyWise from './ConstituencyWise';
import PartyWise from './PartyWise';

import '../css/ResultRequestButtons.css'
class ResultRequestButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partywise: true
        }
    }
    PartyResponse = () => {
        this.setState({ partywise: true })
        this.props.props.history.push('/party-wise-results')
    }
    ConsituencyResponse = () => {
        this.setState({ partywise: false })
        this.props.props.history.push('/constituency-wise-results')
    }
    render() {

        

        return (
            <div>
                <div className="buttonsCss">
                    <div style={{ marginBottom: '6px', alignSelf: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={this.PartyResponse}>
                            Partywise
                </Button>
                    </div>
                    <div style={{ marginRight: '6px', marginBottom: '6px', marginLeft: '6px', alignSelf: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={this.ConsituencyResponse}>
                            Constituencywise - All Candidates
                </Button>
                    </div>
                    <div style={{ alignSelf: 'center', marginBottom: '6px' }}>
                        <Button variant="contained" color="secondary">
                            Constituencywise Trends
                </Button>
                    </div>
                </div>
                    
                        {this.state.partywise ? <PartyWise ></PartyWise> : <ConstituencyWise></ConstituencyWise>}
            </div>
        )
    }
}

export default ResultRequestButtons