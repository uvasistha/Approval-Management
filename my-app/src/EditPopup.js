import React from 'react';

class EditPopup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            orderID : this.props.orderID,
            orderAmount : this.props.orderAmount,
            Notes : this.props.Notes,
            approvalBy : this.props.approvalBy,
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
            show :nextProps.show,
        });
    }

    onClose(){
        this.setState({
            orderID :"",
            orderAmount : "",
            Notes :"",
            approvalBy :"",
            show :false, 
        })
        this.props.setShow()
    }

    onSave(){

        //payload
        console.log(this.state.orderID+this.state.orderAmount+this.state.Notes)
        //send to backend
        //CALL HERE
        
        //reset
        this.setState({
            orderID :"",
            orderAmount : "",
            Notes :"",
            approvalBy :"",
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
        this.setState({approvalBy:"David_Lee"})
        else if(e.target.value>10000 && e.target.value<=50000)
        this.setState({approvalBy:"Laura_Smith"})
        else
        this.setState({approvalBy:"Matthew_Vance"})
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
            <div>
                <div>EDIT ORDER</div>
                <div> <button onClick={this.onClose}>Close</button></div>
                <div>
                    Order ID
                    <input type = "text" value={this.state.orderID} onChange={this.onIDchange.bind(this)} disabled/>
                </div>
                <div>
                    Order Amount  
                    <input type = "text" value={this.state.orderAmount} onChange={this.onOrderAmount.bind(this)}/>
                </div>
                <div>
                    Notes
                    <input type = "text" value={this.state.Notes} onChange={this.onNotes.bind(this)}/>
                </div>
                <div>
                    Approval By
                    <input type = "text" value={this.state.approvalBy} onChange={this.onapprovalBy.bind(this)} disabled/>
                </div>
                <button onClick={this.onSave}>SUBMIT</button>
            </div>
        )
    }
}
export default EditPopup;