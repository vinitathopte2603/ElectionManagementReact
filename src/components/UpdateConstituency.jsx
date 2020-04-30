import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import ConstituencyServices from '../services/ConstituencyServices'
const constituencyServices = new ConstituencyServices()
class UpdateConstituency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            constituencyName: this.props.con.data.constituencyName,
            city: this.props.con.data.city,
            statee: this.props.con.data.state
        }
    }
    Update = () => {
        var data = {
            ConstituencyName: this.state.constituencyName,
            City: this.state.city,
            State: this.state.statee
        }
        var constituencyId = this.props.con.data.constituencyId
        constituencyServices.UpdateConstituency(data, constituencyId).then(response => {
            console.log("updates", response.data);
            this.props.parentToAllConstituenciesCallback()
        })
    
    }
    HandleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        console.log("hdvhsdvc", this.props.con.data);
        const open = this.props.con.update
        return (
            <div>

                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Constituency Update</DialogTitle>
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

                        <Button onClick={this.Update} color="primary">
                            Update
                             </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default UpdateConstituency