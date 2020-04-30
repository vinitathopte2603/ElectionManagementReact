import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import PartyServices from '../services/PartyServices'
const partyServices = new PartyServices()
class AddConstituency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partyName: ''
        }
    }
    Add = () => {
        var data = {
            PartyName: this.state.partyName,
        }
        
        partyServices.AddParty(data).then(response => {
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
                    <DialogTitle id="form-dialog-title">Add Party</DialogTitle>
                    <DialogContent>

                        <TextField
                            required
                            autoFocus
                            value={this.state.partyName}
                            margin="dense"
                            id="name"
                            label="Party Name"
                            fullWidth
                            name="partyName"
                            noValidate
                            onChange={this.HandleOnChange}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button color="primary">
                            Cancel
                            </Button>

                        <Button onClick={this.Add} color="primary">
                            Add Party
                             </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default AddConstituency