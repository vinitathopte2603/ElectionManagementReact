import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import VoterServices from '../services/VoterServices'
const voterServices = new VoterServices()
class Vote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voterFirstName: '',
            voterLastName: '',
            uniqueVoterId: '',
            voterContactNUmber: '',
            candidateId: ''
        }
    }
    Vote = () => {
        var data = {
            VoterFirstName:this.state.voterFirstName,
            VoterLastName:this.state.voterLastName,
            UniqueVoterId:this.state.uniqueVoterId,
            VoterContactNUmber:this.state.voterContactNUmber,
            CandidateId:this.props.con.data.candidateId
        }
        voterServices.Vote(data).then(response => {
            console.log("votedddd", response.data);
            this.props.parentToAllConstituenciesCallback()
        })
    
    }
    HandleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        const open = this.props.con.vote
        return (
            <div>

                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Vote</DialogTitle>
                    <DialogContent>

                        <TextField
                            required
                            autoFocus
                            value={this.state.voterFirstName}
                            margin="dense"
                            id="fname"
                            label="First Name"
                            fullWidth
                            name="voterFirstName"
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                         <TextField
                            required
                            value={this.state.voterLastName}
                            margin="dense"
                            id="lname"
                            label="Last Name"
                            fullWidth
                            name="voterLastName"
                            noValidate
                            onChange={this.HandleOnChange}
                        />


                        <TextField
                            required
                            value={this.state.uniqueVoterId}
                            name="uniqueVoterId"
                            margin="dense"
                            id="voterid"
                            label="Voter Id"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                        <TextField
                            value={this.state.voterContactNUmber}
                            required
                            name="voterContactNUmber"
                            margin="dense"
                            id="contactnumber"
                            label="Contact number"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                          <TextField
                            value={this.props.con.data.candidateFirstName + " "+ this.props.con.data.candidateLastName}
                            required
                            name="candidateId"
                            margin="dense"
                            id="candidateid"
                            label="candidate"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button color="primary">
                            Cancel
                            </Button>

                        <Button onClick={this.Vote} color="primary">
                            Vote
                             </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default Vote