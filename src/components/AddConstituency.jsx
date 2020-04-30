import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import ConstituencyServices from '../services/ConstituencyServices'
const constituencyServices = new ConstituencyServices()
class AddConstituency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            constituencyName: '',
            city: '',
            statee: ''
        }
    }
    Add = () => {
        var data = {
            ConstituencyName: this.state.constituencyName,
            City: this.state.city,
            State: this.state.statee
        }
        
        constituencyServices.AddConstituency(data).then(response => {
            console.log("updates", response.data);
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
                    <DialogTitle id="form-dialog-title">Add Constituency</DialogTitle>
                    <DialogContent>

                        <TextField
                            required
                            autoFocus
                            value={this.state.constituencyName}
                            margin="dense"
                            id="name"
                            label="Constituency Name"
                            fullWidth
                            name="constituencyName"
                            noValidate
                            onChange={this.HandleOnChange}
                        />

                        <TextField
                            required
                            value={this.state.city}
                            name="city"
                            margin="dense"
                            id="city"
                            label="city"
                            fullWidth
                            noValidate
                            onChange={this.HandleOnChange}
                        />
                        <TextField
                            value={this.state.statee}
                            required
                            name="statee"
                            margin="dense"
                            id="state"
                            label="state"
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
                            Add Constituency
                             </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default AddConstituency