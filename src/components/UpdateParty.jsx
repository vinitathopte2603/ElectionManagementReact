import React, { Component } from 'react'
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle,createMuiTheme, ThemeProvider
} from '@material-ui/core';
import PartyServices from '../services/PartyServices'
const partyServices = new PartyServices()

const dialog = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperScrollPaper: {
                width:500
            }
        }
    }
});
class UpdateParty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partyName: this.props.con.data.partyName,
          
        }
    }
    Update = () => {
        var data = {
            PartyName: this.state.partyName,
        }
        var partyId = this.props.con.data.partyId
        
        
        partyServices.UpdateParty(data, partyId).then(response => {
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
            <div >
<ThemeProvider theme={dialog}>
                <Dialog open={open} aria-labelledby="form-dialog-title"  >
                    <DialogTitle id="form-dialog-title">Party Update</DialogTitle>
                    <DialogContent >

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

                        <Button onClick={this.Update} color="primary">
                            Update
                             </Button>
                    </DialogActions>
                </Dialog>
                </ThemeProvider>

            </div>
        )
    }
}
export default UpdateParty