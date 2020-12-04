import React from 'react';
import CLOSE from './close.png'
class EditPopup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            orderID : this.props.orderID,
            orderAmount : this.props.orderAmount,
            Notes : this.props.Notes,
            approvalBy : this.props.approvalBy,
            approvalStatus:this.props.approvalStatus,
            show :this.props.show,
        }
        this.onClose= this.onClose.bind(this)
        this.onSave= this.onSave.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            orderID : nextProps.orderID,
            orderAmount : nextProps.orderAmount,
            Notes : nextProps.Notes,
            approvalBy : nextProps.approvalBy,
            approvalStatus :nextProps.approvalStatus,
            show :nextProps.show,
        });
    }

    onClose(){
        this.setState({
            orderID :"",
            orderAmount : "",
            Notes :"",
            approvalBy :"",
            approvalStatus:"",
            show :false, 
        })
        this.props.setShow()
    }

    onSave(){

        //payload
        console.log(this.state.orderID+this.state.orderAmount+this.state.Notes)
        //send to backend
        //CALL HERE

        var reqdata = {
            "orderID": this.state.orderID,
            "orderAmount": this.state.orderAmount,
            "approvalStatus": this.state.approvalStatus,
            "approvedBy": this.state.approvalBy,
            "approvalStatus":this.state.approvalStatus,
            "Notes": this.state.Notes          
        }
        var url = 'http://localhost:8080/1706545/orderEdit';
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqdata),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.props.setShow()
            })
            .catch((error) => {
                console.error('Error:', error);
                this.props.setShow()
            });

        
        //reset
        this.setState({
            orderID :"",
            orderAmount : "",
            Notes :"",
            approvalBy :"",
            approvalStatus:"",
            show :false, 
        })
        this.props.setShow()

    }


    //Text Changes
    onIDchange(e){
        this.setState({orderID:e.target.value})
    }
    onOrderAmount(e){
        this.setState({orderAmount:e.target.value})
        if(e.target.value<=10000 || e.target.value == "")
        this.setState({approvalBy:"David_Lee", approvalStatus:"Approved"})
        else if(e.target.value>10000 && e.target.value<=50000)
        this.setState({approvalBy:"Laura_Smith",approvalStatus:"Awaiting Approval"})
        else
        this.setState({approvalBy:"Matthew_Vance",approvalStatus:"Awaiting Approval"})
    }
    onNotes(e){
        this.setState({Notes:e.target.value})
    }
    onapprovalBy(e){
        this.setState({approvalBy:e.target.value})
    }

    render(){
        if(this.state.show !== true)
        return null
        return(
            <div className="popupouter">
                <div className="popupinner fontNormal">
                <div><font size="5" className = "fontNormal">EDIT ORDER</font>
                    <img src={CLOSE} style={{width: '15px'}} onClick={this.onClose}/></div>
                    <tr>
                       <td> Order ID</td>
                       <td><input className="textboxpopup" type = "text" value={this.state.orderID} onChange={this.onIDchange.bind(this)} disabled/></td>
                    </tr>
                    <tr>
                    <td>Order Amount </td> 
                        <td><input className="textboxpopup" type = "text" value={this.state.orderAmount} onChange={this.onOrderAmount.bind(this)}/></td>
                    </tr>
                    <tr>
                    <td>Notes</td>
                    <td><input className="textboxpopup" type = "text" value={this.state.Notes} onChange={this.onNotes.bind(this)}/></td>
                    </tr>
                    <tr>
                    <td>Approval By</td>
                        <td><input className="textboxpopup" type = "text" value={this.state.approvalBy} onChange={this.onapprovalBy.bind(this)} disabled/></td>
                    </tr>
                    <button className="button" onClick={this.onSave}>SUBMIT</button>
                </div>
            </div>
        )
    }
}
export default EditPopup;