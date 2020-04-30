import React, { Component } from 'react';
import {
    Button, AppBar, Toolbar, Typography, Avatar, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import ResultRequestButtons from './ResultRequestButtons';
import '../css/DisplayResult.css'
import image from '../images/ani1579802140.jpg'
import AdminServices from '../services/AdminServices'
import EditDetailsButtons from './EditDetailsButtons'
import { connect } from 'react-redux';
let adminServices = new AdminServices()
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
class DisplayResult extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            openDialog: false,
            email: '',
            loggedIn,
            password: '',
            errorMessage: '',
            errors: {
                email: '',
                password: ''
            }
        }
    }
    OpenDialog = () => {
        this.props.history.push('/login')
        try {
            this.setState({ openDialog: true, errorMessage: '' })
        } catch (e) {
            console.error(e.message)

        }

    }
    CloseDialog = () => {
        this.setState({ openDialog: false, errorMessage: '' })
        this.props.history.push('/')
    }
    HandleOnChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;

            default:
                break;
        }

        this.setState({ errors, [name]: value });


    }
    LogOut = () => {
        localStorage.removeItem("emailaddress")
        localStorage.removeItem("token")
        this.setState({ loggedIn: false })
    }
    LogIn = (event) => {
        
        let errors = this.state.errors
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            var data = {
                AdminEmail: this.state.email,
                Password: this.state.password
            }
            if (!data["AdminEmail"]) {
                errors.email = "Email is required"

            }
            if (!data["Password"]) {
                errors.password = "Password is required"

            } this.setState({ errors: errors })
            if (data["AdminEmail"] && data["Password"]) {
                adminServices.Login(data).then(response => {
                    console.log("logged in", response);
                    this.setState({ openDialog: false, email: '', password: '', loggedIn: true })
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("emailaddress", response.data.data.adminEmail)
                }).catch(error => {
                    console.log("error from backend", error)
                    this.setState({ errorMessage: error })
                })
            }


        }


    }
    render() {
        const { errors } = this.state;
        const open = this.state.openDialog
        return (
            <div>
                <div>
                    <AppBar position="static">
                        <Toolbar className="appbar">
                            <Avatar variant="square" src={image} style={{ height: '70px', width: '76px' }}></Avatar>
                            <Typography variant="h6" >
                                Election Commission of India
                            </Typography>
                            <Button color="inherit" onClick={this.OpenDialog}>Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Dialog open={open} onClose={this.CloseDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Admin SignIn</DialogTitle>
                        <DialogContent>
                            {this.state.loggedIn ? <div>{localStorage.getItem("emailaddress")}</div> :
                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    name="email"
                                    noValidate
                                    onChange={this.HandleOnChange}
                                />}
                            {errors.email.length > 0 &&
                                <span className='validation'>{errors.email}</span>}
                            {this.state.loggedIn ? null :
                                <TextField
                                    required
                                    name="password"
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    fullWidth
                                    noValidate
                                    onChange={this.HandleOnChange}
                                />}
                            {errors.password.length > 0 &&
                                <span className='validation'>{errors.password}</span>}
                        </DialogContent>
                        {this.state.errorMessage === '' ? null : <div className="login">Email Id or password is incorrect</div>}
                        <DialogActions>
                            <Button onClick={this.CloseDialog} color="primary">
                                Cancel
                            </Button>
                            {this.state.loggedIn ?
                                <Button onClick={this.LogOut} color="primary">
                                    Logout
                            </Button>
                                :
                                <Button onClick={this.LogIn} color="primary">
                                    Login
                             </Button>
                            }

                        </DialogActions>
                    </Dialog>
                </div>
                <h1 align="center">General Elections 2020</h1>
                {this.state.loggedIn ? <EditDetailsButtons props={this.props}/> : null}
                {this.props.posts.view === false ? null:
                <ResultRequestButtons props={this.props}></ResultRequestButtons>}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(DisplayResult)