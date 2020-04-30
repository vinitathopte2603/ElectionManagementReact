import React, { Component } from 'react'
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, ClickAwayListener, Button, Checkbox } from '@material-ui/core';
import CandidateServices from '../services/CandidateServices'
import AddCandidate from './AddCandidate'
import UpdateCandidate from './UpdateCandidate'
import Vote from './Vote'
const candidateServices = new CandidateServices()
class AllCandidates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidates: [],
            data: [],
            update: false,
            add: false,
            vote: false,
            candidatesToDelete: []
        }
    }
    componentDidMount = () => {
        this.GetAllCandidates()
    }
    GetAllCandidates = () => {
        candidateServices.GetAllCandidates().then(response => {
            this.setState({ candidates: response.data.data })
        })

    }
    UpdateCandidate = (element) => {
        this.setState({ update: true, data: element })
    }
    CloseDialog = () => {
        this.setState({ update: false, add: false, vote: false })
    }
    parentCallback = () => {

        this.GetAllCandidates()
    }
    Add = () => {
        this.setState({ add: true })
    }
    CastVote = (element) => {
        this.setState({ vote: true, data: element })
    }
    DeleteCandidate = (candidateId) => {
        var data = {
            id: candidateId
        }
        this.state.candidatesToDelete.push(data)
    }
    render() {
        const table = this.state.candidates.map((element, index) => {
            return (
                <tr key={index}>
                    <td>
                        <Checkbox
                            value="primary"
                            onClick={() => this.DeleteCandidate(element.candidateId)}
                        />
                    </td>
                    <td className="tablecells" onClick={() => this.UpdateCandidate(element)}>
                        {element.candidateFirstName + " " + element.candidateLastName}
                    </td>

                    {element.partyName.map((object, index) => {
                        return (
                            <td className="tablecells" key={index}>
                                {object.name}
                            </td>
                        )
                    })}

                    {element.constituencyName.map((object, index) => {
                        return (
                            <td className="tablecells" key={index}>
                                {object.name}
                            </td>
                        )
                    })}
                    <td className="tablecells">
                        <Button onClick={() => this.CastVote(element)} color="secondary" variant="contained" >
                            Vote
                        </Button>
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
                                <TableCell align="center" style={{ border: '2px solid' }}>Candidate Name</TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>Party Name</TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>Constituency Name</TableCell>
                                <TableCell align="center" style={{ border: '2px solid' }}>   </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.state.update ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <UpdateCandidate parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
                {this.state.add ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <AddCandidate parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
                {this.state.vote ?
                    <ClickAwayListener onClickAway={this.CloseDialog}>
                        <Vote parentToAllConstituenciesCallback={this.parentCallback} con={this.state} />
                    </ClickAwayListener>
                    : null}
            </div>
        )
    }
}
export default AllCandidates