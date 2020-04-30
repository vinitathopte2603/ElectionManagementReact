import React, { Component } from 'react'
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button, Checkbox, ClickAwayListener } from '@material-ui/core';
import ConstituencyServices from '../services/ConstituencyServices'
import UpdateConstituency from './UpdateConstituency'
import AddConstituency from './AddConstituency'
const constituencyServices = new ConstituencyServices()
class AllConstituencies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            constituencies: [],
            statee: '',
            constituenciesToDelete: [],
            update: false,
            add: false,
            updateData: []
        }
    }
    componentDidMount = () => {
        this.GetAllConstituencies(this.state.statee)
    }
    GetAllConstituencies = () => {

        constituencyServices.GetAllConstituencies(this.state.statee).then(response => {
            this.setState({ constituencies: response.data.data })

        })

    }
    DeleteConstituency = (constituencyId) => {
        var data = {
            id: constituencyId
        }
            this.state.constituenciesToDelete.push(data)
    }
    UpdateConstituency = (element) => {
        this.setState({ update: true, data: element })
    }
    CloseDialog = () => {
        this.setState({ update: false, add: false })
    }
    parentCallback = () => {

        this.GetAllConstituencies()
    }
    Add = () => {
        this.setState({ add: true })
    }
    render() {
        const table = this.state.constituencies.map((element, index) => {
            return (
                <tr key={index} >
                    <td>
                        <Checkbox
                            value="primary"
                            onClick={() => this.DeleteConstituency(element.constituencyId)}
                        />
                    </td>
                    <td onClick={() => this.UpdateConstituency(element)} className="tablecells">
                        {element.constituencyName}
                    </td>
                    <td className="tablecells">
                        {element.city}
                    </td>
                    <td className="tablecells">
                        {element.state}
                    </td>


                </tr>
            )
        })
        return (

            <div className="tablecss">
                <TableContainer style={{ width: '715px' }} component={Paper}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={this.Add} style={{ backgroundColor: 'green', color: 'white' }}>Add</Button>
                        <Button style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                    </div>
                    <Table>

                        <TableHead style={{ backgroundColor: 'mistyrose' }}>
                            <TableRow>
                                <TableCell align="center" style={{ border: '2px solid' }}>       </TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>Constituency Name</TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>City</TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.state.update ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <UpdateConstituency parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
                {this.state.add ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <AddConstituency parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
            </div>
        )
    }
}
export default AllConstituencies