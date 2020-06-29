import React, {Component} from 'react';
import './index.css';
import axios from '../axios/axios';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class Login extends Component {

    state = {
        fields: {},
        errors: {}
    }
    login() {
        const password = this.state.fields.password;
        const userName = this.state.fields.userName;

        if(password && userName){
        axios.post('/login', {
            userName: userName,
            password: password
        }).then(response => {
                let data = response.data;
                localStorage.setItem('auth-data', data.token);
                this.props.history.push('/dashboard', {token:data.token});
            }).catch(error=> {
                 alert(error)
            });
        }
        else {alert("Form has errors.")}     
    }


    handleValidation(){
        let fields = this.state.fields;
        let errors = {};

        //Password
        if(!fields["password"]){
           errors["password"] = "Cannot be empty";
        }

        if(typeof fields["password"] !== "undefined"){
           if(!fields["password"].match(/^[a-zA-Z]+[0-9]+$/)){
              errors["password"] = "Mast be letters & numbers";
           }        
        }

        //User Name
        if(!fields["userName"]){
           errors["userName"] = "Cannot be empty";
        }

        if(typeof fields["userName"] !== "undefined"){
           let lastAtPos = fields["userName"].lastIndexOf('@');
           let lastDotPos = fields["userName"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["userName"].indexOf('@@') === -1 && lastDotPos > 2
                && (fields["userName"].length - lastDotPos) > 2)) {
                   errors["userName"] = "Email is not valid";
                }
       }  
       this.setState({errors: errors});
    }


    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
        this.handleValidation()
    }
    render() {
        return (
            <div className=" wrapper row justify-content-center m-0 ">
                <Form className="loginForm col-3">
                    <h4>Login by User Name</h4>
                    <FormGroup>
                        <Label for="userName">User Name</Label>
                        <Input name="userName" onChange={(e)=>this.handleChange("userName",e)} type="email"/>
                        <span style={{color: "red"}}>{this.state.errors["userName"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input name="password" onChange={(e)=>this.handleChange("password",e)} type="password"/>
                        <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                    </FormGroup>
                    <br/>
                    <Button block style={{backgroundColor:'#2EC2FE'}} onClick={() => this.login()}>Sign in</Button>
                </Form>     
            </div>
        );
    }
}

export default Login;
