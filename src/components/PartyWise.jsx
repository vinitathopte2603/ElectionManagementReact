import React, { Component, Suspense, lazy } from 'react';
import { Card, InputLabel, FormControl, Select, createMuiTheme, ThemeProvider } from '@material-ui/core';
import '../css/PartyWise.css'
// import PartyResultTable from './PartyResultTable'
import ConstituencyServices from '../services/ConstituencyServices'
import PartyServices from '../services/PartyServices'
const PartyResultTable = lazy(() => import("./PartyResultTable"));
let partyServices = new PartyServices()
let constituencyServices = new ConstituencyServices()
const selectortheme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            input: {
                paddingTop: 6,
                paddingBottom: 5,
                paddingLeft: 12,
                paddingRight: 5
            }
        }
    }
});
class PartyWise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStates: [],
            statee: '',
            result: []
        }
    }
    GetAllStates = () => {
        constituencyServices.GetAllStates().then(response => {
            console.log("all states", response.data.data);

            this.setState({ allStates: response.data.data })
        })
    }
    componentDidMount = () => {

        this.GetAllStates()

    }
    handleStateChange = event => {
        
        this.setState({ [event.target.name]: event.target.value });
        partyServices.PartyWiseResponse(this.state.statee).then(response => {
            this.setState({ result: response.data.data })
        })
      
    }
    render() {
        const states = this.state.allStates.map((element, index) => {
            return (
                <option key={index} name='statee' value={element.name}>{element.name}</option>
            )
        })
        return (
            <div>
                <div className="maindiv">
                    <Card variant="outlined" style={{ width: '715px', marginLeft: '1px', marginRight: '1px' }}>
                        <div className="textcss">Partywise Trends and Results</div>
                        <div className="selectdiv">
                            <ThemeProvider theme={selectortheme}>
                                <div style={{ display: 'flex', padding: '5px' }}>
                                    <div style={{ paddingRight: '15px', fontWeight: 600 }}>Select State</div>
                                    <div>
                                        <FormControl variant="outlined" style={{ backgroundColor: 'white' }}>
                                            <InputLabel htmlFor="outlined-state-native-simple"></InputLabel>
                                            <Select
                                                native
                                                // value={this.state.constituency}
                                                onChange={this.handleStateChange}
                                                inputProps={{
                                                    name: 'statee',
                                                    id: 'outlined-state-native-simple',
                                                }}
                                            >
                                                <option>select state..</option>
                                                {states}

                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </ThemeProvider>
                        </div>
                    </Card>
                </div>
                <div>
                    <Suspense fallback={<h2 style={{ display: 'flex', justifyContent: 'center' }}>Loading...</h2>}>
                        <PartyResultTable party={this.state.result}></PartyResultTable>
                    </Suspense>

                </div>
            </div>
        )
    }
}
export default PartyWise