import React, { Component } from 'react'
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import '../css/ConstituencyResultTable.css'
class ConstituencyResultTable extends Component {
    constructor(props){
        super(props)
        this.state={
            openDialog:false
        }
    }
    OpenDialog=()=>{
        this.setState({openDialog:true})
    }
    render() {
        var table = this.props.candidatesConstituency.map((element, index) => {
            return (
                <tr key={index}>
                    <td className="tablecells" onClick={this.OpenDialog}>
                        {element.candidateName}
                    </td>
                    <td className="tablecells">
                        {element.partyName}
                    </td>
                    <td className="tablecells">
                        {element.votes}
                    </td>
                </tr>
            )
        })
        return (
            <div className="tablecss">
                <TableContainer style={{ width: '715px' }} component={Paper}>
                    <Table>
                        <TableHead style={{ backgroundColor: 'mistyrose'}}>
                            <TableRow>
                                <TableCell align="center" style={{ border: '2px solid'}}>Candidate Name</TableCell>
                                <TableCell align="center" style={{ border: '2px solid'}}>Party Name</TableCell>
                                <TableCell align="center" style={{ border: '2px solid'}}>Votes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
export default ConstituencyResultTable