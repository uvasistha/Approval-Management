import React from 'react';
import CLOSE from './close.png'

class AddPopup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            orderDate : "",
            approvedBy :"",
            orderID :"",
            companyName : "",
            companyID : "",
            orderAmount : "",
            approvalStatus :"",
            Notes :"",
            show :this.props.show,
        }
        this.onClose= this.onClose.bind(this)
        this.onSave= this.onSave.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({show: nextProps.show});
    }

    onClose(){
        this.setState({
            orderDate : "",
            approvedBy :"",
            orderID :"",
            companyName : "",
            companyID : "",
            orderAmount : "",
            approvalStatus :"",
            Notes :"",
            show :false, 
        })
        this.props.setShow()
    }

    onSave(){

        //payload
        console.log(this.state.orderID+this.state.orderAmount+this.state.Notes+this.state.companyID+this.state.companyName+this.state.approvalStatus)
        //send to backend
        //CALL HERE

        //reset
        this.setState({
            orderDate : "",
            approvedBy :"",
            orderID :"",
            companyName : "",
            companyID : "",
            orderAmount : "",
            approvalStatus :"",
            Notes :"",
            show :false, 
        })
        this.props.setShow()

    }

     //Text Changes
    onOrderDate(e){
        this.setState({orderDate:e.target.value})
    }
    onapprovedBy(e){
        this.setState({approvedBy:e.target.value})
    }
    onorderID(e){
        this.setState({orderID:e.target.value})
    }
    oncompanyName(e){
        this.setState({companyName:e.target.value})
    }
    oncompanyID(e){
        this.setState({companyID:e.target.value})
    }
    onorderAmount(e){
        this.setState({orderAmount:e.target.value})
        if(e.target.value<=10000 || e.target.value == "")
        this.setState({approvedBy:"David_Lee", approvalStatus :"Approved"})
        else if(e.target.value>10000 && e.target.value<=50000)
        this.setState({approvedBy:"", approvalStatus :"Awaiting Approval"})
        else
        this.setState({approvedBy:"", approvalStatus :"Awaiting Approval"})
    }
    onapprovalStatus(e){
        this.setState({approvalStatus:e.target.value})
    }
    onNotes(e){
        this.setState({Notes:e.target.value})
    }


    render(){
        if(this.state.show !== true)
        return null
        return(
            <div className="popupouter">
                <div className="popupinner fontNormal">
                    <br/>
                    <div><font size="5" className = "fontNormal"><b>ADD ORDER</b></font>
                    <img src={CLOSE} className="popupclose" onClick={this.onClose}/></div>
                    
                    <br/>
                    <div className="popupcontent">
                        <tr>
                        <td>Order ID </td>
                        <td> <input className="textboxpopup" type = "text" value={this.state.orderID} onChange={this.onorderID.bind(this)}/></td>
                        </tr>
                        <tr>
                        <td>Order Date </td>
                        <td><input className="textboxpopup" type = "text" value={this.state.orderDate} onChange={this.onOrderDate.bind(this)}/></td>
                        </tr>
                        <tr>
                        <td>Customer Name </td>
                        <td> <input className="textboxpopup" type = "text" value={this.state.companyName} onChange={this.oncompanyName.bind(this)}/></td>
                        </tr>
                        <tr>
                        <td> Customer Number </td>
                        <td><input className="textboxpopup" type = "text" value={this.state.companyID} onChange={this.oncompanyID.bind(this)}/></td>
                        </tr>
                        <tr>
                        <td> Order Amount  </td>
                        <td><input className="textboxpopup" type = "text" value={this.state.orderAmount} onChange={this.onorderAmount.bind(this)}/></td>
                        </tr>
                        <tr>
                        <td>Notes</td>
                        <td><input className="textboxpopup" type = "text" value={this.state.Notes} onChange={this.onNotes.bind(this)}/></td>
                        </tr>
                    </div>
                    <br/>
                    <button className="button popupaction" onClick ={this.onSave}>ADD</button>
                </div>
            </div>
        )
    }
}
export default AddPopup;