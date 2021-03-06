import React from 'react';
import Dash from './Dash';
import HRC from './hrc-logo.svg'
import ARM from './human-machine-hand-homepage.svg'


class Login extends React.Component{

    constructor(){
        super()
        this.state = {
            id : "",
            pass : "",
            level : -1,
            allow :false
        }
    }

    onId(e){
        this.setState({id:e.target.value})
    }
    onPass(e){
        this.setState({pass:e.target.value})
    }
    onLogin(){
        //BACEND VERIFY
        //console.log(this.state.id+this.state.pass)
        var url = 'http://localhost:8080/1706545/Login?id='+this.state.id+'&pass='+this.state.pass;
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ allow: data.allow })
                console.log('allow:', data);
            })
            .catch((error) => {
                this.setState({ allow: false})
                console.error('Error:', error);
            });
            if(this.state.id==="David_Lee" )
            this.setState({level:0})
        else if(this.state.id==="Laura_Smith")
            this.setState({level:1})
        else if(this.state.id==="Matthew_Vance") 
            this.setState({level:2}) 
        else
            this.setState({level:-1,allow:false})
    }

    render(){
        if(!this.state.allow || this.state.level===-1)
        return(
            <div>
                <img src={HRC} className="hrclogin"/>
                <img src={ARM} className="flip-horizontally" />
                <div class="btn">
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">ORDER MANAGEMENT APPLICATION</button>
                </div>
                    <div className="logingrid">
                        <font size="5" className = "fontNormal">Sign In</font><br/><br/>
                        <font  className = "fontNormal">UserName</font><br/>
                        <input className="textbox" type = "text" value={this.state.id} onChange={this.onId.bind(this)}/><br/><br/>
                        <font  className = "fontNormal">Password</font><br/>
                        <input className="textbox" type = "password" value={this.state.pass} onChange={this.onPass.bind(this)}/><br/><br/><br/>
                        {this.state.id==="" || this.state.pass===""?<button className="buttondisabled loginaction" disabled>Sign In</button>:
                        <button className="button loginaction" onClick ={this.onLogin.bind(this)}>Sign In</button>}
                    </div>
            </div>
        )
        else
        return(
            <Dash level ={this.state.level}/>
        )
    }
}
export default Login