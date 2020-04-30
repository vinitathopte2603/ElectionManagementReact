import React, { Component } from 'react';
import { Card, InputLabel, FormControl, Select, createMuiTheme, ThemeProvider } from '@material-ui/core';
import '../css/ConstituencyWise.css'
import ConstituencyServices from '../services/ConstituencyServices'
import ConstituencyResultTable from './ConstituencyResultTable';
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
class ConstituencyWise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            constituency: '',
            allConstituencies: [],
            allStates: [],
            costituencywiseCandidates: [],
            statee: ''
        }
    }
    GetAllConstituencies = (data) => {
        constituencyServices.GetAllConstituencies(data).then(response => {

            this.setState({ allConstituencies: response.data.data })
    
        })
    }
    GetAllStates = () => {
        constituencyServices.GetAllStates().then(response => {
            console.log("all states", response.data.data);

            this.setState({ allStates: response.data.data })
        })
    }
    componentDidMount = () => {
        
        this.GetAllStates()
         this.GetAllConstituencies(this.state.statee)
    }
    handleStateChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log("jshxbhs", this.state.statee);
        this.GetAllConstituencies(this.state.statee)
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });


        constituencyServices.ConstituencyWiseResponse(this.state.constituency).then(response => {
            console.log("constituencywise", response.data.data);
            this.setState({ costituencywiseCandidates: response.data.data })
        })

    };
    render() {
        const constituencies = this.state.allConstituencies.map((element, index) => {
            return (
                <option key={index} name='constituency' value={element.constituencyId}>{element.constituencyName}</option>
            )
        })
        const states = this.state.allStates.map((element, index) => {
            return (
                <option key={index} name='statee' value={element.name}>{element.name}</option>
            )
        })
        return (
            <div>
                <div className="maindiv">
                    <Card variant="outlined" style={{ width: '715px', marginLeft: '1px', marginRight: '1px' }}>
                        <div className="textcss">Constituencywise - All Candidates</div>
                        <div className="selectiondiv">
                           
                            
                                <ThemeProvider theme={selectortheme}>
                                    <div style={{display: 'flex',padding: '5px'}}>
                                <div style={{ paddingRight: '15px', fontWeight: 600 }}>Select State</div>
                                <div>
                                <FormControl variant="outlined" style={{backgroundColor:'white'}}>
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

                                   <div style={{display: 'flex',padding: '5px'}}>
                                    <div style={{ paddingRight: '15px', fontWeight: 600 }}>Select Constituency</div>
                                    <div>
                                    <FormControl variant="outlined" style={{backgroundColor:'white'}}>
                                        <InputLabel htmlFor="outlined-constituency-native-simple"></InputLabel>
                                        <Select
                                            native
                                            // value={this.state.constituency}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'constituency',
                                                id: 'outlined-constituency-native-simple',
                                            }}
                                        >
                                            <option>select constituency..</option>
                                            {constituencies}

                                        </Select>
                                    </FormControl>
                                    </div>
                                   </div>


                                </ThemeProvider>
                
                        </div>
                    </Card>
                </div>
                <div>
                    <ConstituencyResultTable candidatesConstituency={this.state.costituencywiseCandidates}></ConstituencyResultTable>
                </div>
            </div>
        )
    }
}
export default ConstituencyWise