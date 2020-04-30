import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import CandidateServices from '../services/CandidateServices'
const candidateServices = new CandidateServices()
class UpdateCandidate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidateFirstName:this.props.con.data.candidateFirstName ,
            candidateLastName: this.props.con.data.candidateLastName,
            partyId: '',
            candidatePhoneNumber: '',
            constituencyId: ''
        }
    }
    Update = () => {
        var data = {
            CandidateFirstName:this.state.candidateFirstName,
            CandidateLastName:this.state.candidateLastName,
            PartyId:this.state.partyId,
            CandidatePhoneNumber:this.state.candidatePhoneNumber,
            ConstituencyId:this.state.constituencyId
        }
        var candidateId = this.props.con.data.candidateId
        candidateServices.UpdateCandidate(data, candidateId).then(response => {
            console.log("updates", response.data);
            this.props.parentToAllConstituenciesCallback()
        })
    
    }
    HandleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        const open = this.props.con.update
        return (
            <div>

                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Candidate Update</DialogTitle>
                    <DialogContent>

                        <TextField
                            required
                            autoFocus
                            value={this.state.candidateFirstName}
                            margin="dense"
                            id="fname"
                            label="First Name"
                            fullWidth
                            name="candidateFirstName"
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                         <TextField
                            required
                            autoFocus
                            value={this.state.candidateLastName}
                            margin="dense"
                            id="lname"
                            label="Last Name"
                            fullWidth
                            name="candidateLastName"
                            noValidate
                            onChange={this.HandleOnChange}
                        />


                        <TextField
                            required
                            value={this.state.partyId}
                            name="partyId"
                            margin="dense"
                            id="party"
                            label="party"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                        <TextField
                            value={this.state.candidatePhoneNumber}
                            required
                            name="candidatePhoneNumber"
                            margin="dense"
                            id="contact"
                            label="Contact number"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                          <TextField
                            value={this.state.constituencyId}
                            required
                            name="constituencyId"
                            margin="dense"
                            id="constituencyid"
                            label="constituency"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button color="primary">
                            Cancel
                            </Button>

                        <Button onClick={this.Update} color="primary">
                            Update
                             </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default UpdateCandidate