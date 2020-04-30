import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import CandidateServices from '../services/CandidateServices'
const candidateServices = new CandidateServices()
class AddConstituency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidateFirstName: '',
            candidateLastName: '',
            partyId: '',
            candidatePhoneNumber: '',
            constituencyId: ''
        }
    }
    Add = () => {
        var data = {
            CandidateFirstName:this.state.candidateFirstName,
            CandidateLastName:this.state.candidateLastName,
            PartyId:this.state.partyId,
            CandidatePhoneNumber:this.state.candidatePhoneNumber,
            ConstituencyId:this.state.constituencyId
        }

        candidateServices.AddCandidate(data).then(response => {
            console.log("added", response.data);
            this.props.parentToAllConstituenciesCallback()
        })

    }
    HandleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value });


    }
    render() {

        const open = this.props.con.add
        return (
            <div>

                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Candidate</DialogTitle>
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

                        <Button onClick={this.Add} color="primary">
                            Add Candidate
                             </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default AddConstituency