import React from 'react';

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
            <div>
                <div>ADD ORDER</div>
                <div> <button onClick={this.onClose}>Close</button></div>
                <div>
                    Order ID 
                    <input type = "text" value={this.state.orderID} onChange={this.onorderID.bind(this)}/>
                </div>
                <div>
                    Order Date 
                    <input type = "text" value={this.state.orderDate} onChange={this.onOrderDate.bind(this)}/>
                </div>
                <div>
                    Customer Name 
                    <input type = "text" value={this.state.companyName} onChange={this.oncompanyName.bind(this)}/>
                </div>
                <div>
                    Customer Number 
                    <input type = "text" value={this.state.companyID} onChange={this.oncompanyID.bind(this)}/>
                </div>
                <div>
                    Order Amount  
                    <input type = "text" value={this.state.orderAmount} onChange={this.onorderAmount.bind(this)}/>
                </div>
                <div>
                    Notes
                    <input type = "text" value={this.state.Notes} onChange={this.onNotes.bind(this)}/>
                </div>
                <button onClick ={this.onSave}>ADD</button>
            </div>
        )
    }
}
export default AddPopup;