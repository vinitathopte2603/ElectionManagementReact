import React, { Component } from 'react'
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import '../css/ConstituencyResultTable.css'
import usePromise from "react-promise-suspense";
const waitt = (t = 1000) =>
  new Promise((res) =>
    setTimeout(() => {
      return res();
    }, t)
  );
class PartyResultTable extends Component {
    
    constructor(props){
        usePromise(waitt, [5000]);
        super(props)
        this.state={
            openDialog:false
        }
    }
    OpenDialog=()=>{
        this.setState({openDialog:true})
    }
    render() {
        var table = this.props.party.map((element, index) => {
            return (
                <tr key={index}>
                    
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
export default PartyResultTable