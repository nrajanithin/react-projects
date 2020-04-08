import React from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {username : "", password:""}
    }
    changeHandle = (e)=>
    {
       this.setState({[e.target.name] : e.target.value})
    }
    submitHandle = ()=>
    {
        console.log(this.state)
        Axios.post("http://localhost:9000/testAPI/check",this.state)
        .then(res => {
            console.log(res.data)
            if(res.data == "ok")
            {
                this.props.history.push("/home");
            }
        })
    }
    shouldComponentUpdate()
    {
        return false;
    }
    render()
    {
        return(
            <div>
                    <label>Enter the Username</label>
                    <input type="text" name="username" onChange={this.changeHandle} style={{width:"20%"}} required/>
                    <br/>
                    <label>Enter the password</label>
                    <input type="password" name="password" onChange={this.changeHandle} style={{width:"20%"}} required/>
                    <br/>
                    <button onClick={this.submitHandle}>Login</button>
            </div>
        );
    }
}
export default withRouter(Login);