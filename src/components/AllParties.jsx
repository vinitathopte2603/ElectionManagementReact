import React, { Component } from 'react'
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, ClickAwayListener, Button, Checkbox } from '@material-ui/core';
import PartyServices from '../services/PartyServices'
import AddParty from './AddParty'
import UpdateParty from './UpdateParty'
const partyServices = new PartyServices()
class AllParties extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parties: [],
            data: [],
            update: false,
            add: false,
            partiesToDelete: []
        }
    }
    componentDidMount = () => {
        this.GetAllParties()
    }
    GetAllParties = () => {
        partyServices.GetAllParties().then(response => {
            this.setState({ parties: response.data.data })

        })

    }
    UpdateParty = (element) => {
        this.setState({ update: true, data: element })
    }
    CloseDialog = () => {
        this.setState({ update: false, add: false })
    }
    parentCallback = () => {

        this.GetAllParties()
    }
    Add = () => {
        this.setState({ add: true })
    }
    DeleteParty = (partyId) => {

        var data = {
            PartyId: partyId
        }
        this.state.partiesToDelete.push(data)
    }
    Delete = () => {

        var data1 = {
            PartyIds: this.state.partiesToDelete
        }
        console.log("state", data1);

        partyServices.DeleteParties(data1).then(response => {
            this.parentCallback()

        }).catch = error => {
            console.log("error from backend", error)

        }
    }
    render() {
        const table = this.state.parties.map((element, index) => {
            return (
                <tr key={index} >
                    <td>
                        <Checkbox
                            value="primary"
                            onClick={() => this.DeleteParty(element.partyId)}
                        />
                    </td>
                    <td onClick={() => this.UpdateParty(element)} className="tablecells">
                        {element.partyName}
                    </td>

                </tr>
            )
        })
        return (

            <div className="tablecss">
                <TableContainer style={{ width: '715px' }} component={Paper}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={this.Add} style={{ backgroundColor: 'green', color: 'white' }}>Add</Button>
                        <Button onClick={this.Delete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                    </div>
                    <Table>
                        <TableHead style={{ backgroundColor: 'mistyrose' }}>
                            <TableRow>
                                <TableCell align="center" style={{ border: '2px solid' }}>       </TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>Party Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.state.update ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <UpdateParty parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
                {this.state.add ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <AddParty parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
            </div>
        )
    }
}
export default AllParties