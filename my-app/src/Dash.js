import React from 'react';
import AddPopup from './AddPopup.js';
import EditPopup from './EditPopup.js';
import HRC from './hrc-logo.svg'
import ABC from './abc-logo.png'

class Dash extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            level : this.props.level,
            orderList :[],
            /*
            orderList : [{
                orderDate : "01/01/2020",
                approvedBy :"David_Lee",
                orderID :"0001",
                companyName : "ABCDE",
                companyID : "XYZ1",
                orderAmount : "5000",
                approvalStatus :"Approved",
                Notes :"Approved by David_Lee"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0002",
                companyName : "ABCDE",
                companyID : "XYZ2",
                orderAmount : "12000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Laura"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0003",
                companyName : "ABCDE",
                companyID : "XYZ3",
                orderAmount : "250000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Mathew"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"David_Lee",
                orderID :"0001",
                companyName : "ABCDE",
                companyID : "XYZ1",
                orderAmount : "5000",
                approvalStatus :"Approved",
                Notes :"Approved by David_Lee"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0002",
                companyName : "ABCDE",
                companyID : "XYZ2",
                orderAmount : "12000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Laura"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0003",
                companyName : "ABCDE",
                companyID : "XYZ3",
                orderAmount : "250000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Mathew"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"David_Lee",
                orderID :"0001",
                companyName : "ABCDE",
                companyID : "XYZ1",
                orderAmount : "5000",
                approvalStatus :"Approved",
                Notes :"Approved by David_Lee"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0002",
                companyName : "ABCDE",
                companyID : "XYZ2",
                orderAmount : "12000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Laura"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0003",
                companyName : "ABCDE",
                companyID : "XYZ3",
                orderAmount : "250000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Mathew"
            },
            {
                orderDate : "01/01/2020",
                approvedBy :"",
                orderID :"0003",
                companyName : "ABCDE",
                companyID : "XYZ3",
                orderAmount : "250000",
                approvalStatus :"Awaiting Approval",
                Notes :"Awaiting Approval by Mathew"
            }
            ],*/
            searchValueText : "",
            addMode : false,
            checkedId : -1,
            editMode :false,
            totalPage :1,
            currentPage:1,
        };
        this.onAdd = this.onAdd.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onApprove = this.onApprove.bind(this)
        this.onReject = this.onReject.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.hideAddPopup = this.hideAddPopup.bind(this);
        this.hideEditPopup = this.hideEditPopup.bind(this);
        this.onCheck = this.onCheck.bind(this)
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.getRecordForPage =this.getRecordForPage.bind(this)

    }

    //MOUNT LOGIC
    componentDidMount(){
        //first time
        //GET order List from backend and fill the orderList Array
        this.getRecordForPage(1)
    }

    //ADD LOGIC
    hideAddPopup(){
        this.setState({addMode:false})
        //refersh fro new orders
        //BACKEND CALL -> add new order here
        this.getRecordForPage(this.state.currentPage)
    }
    onAdd(){
        this.setState({addMode:true})
    }

    //EDIT LOGIC
    onEdit(){
        this.setState({editMode:true})
    }
    hideEditPopup(){
        this.setState({editMode:false})
        //refersh fro new orders
        //BACKEND CALL -> edit orders here
        this.getRecordForPage(this.state.currentPage)
        //uncheck post edit
        if(this.state.checkedId!==-1)
        document.getElementById(this.state.checkedId).click()
    }

    //CheckBox Magic
    onCheck(e){
        var id = e.target.id
        //make it behave like radio
        if(this.state.checkedId!==id && this.state.checkedId!==-1)
        document.getElementById(this.state.checkedId).click()
        if(e.target.checked){
        this.setState({checkedId:id})
        }
        else{
        this.setState({checkedId:-1})
        }
    }

    //APPROVE LOGIC
    onApprove(){
        // Save to backend
         var orderID = this.state.orderList[this.state.checkedId.toString().substr(9)].orderID
        //API HERE
        //CALL approve?orderID&level -> approve
        var reqdata = {
            "orderID": orderID,
            "approvalStatus": "Approved",
        }
        var url = 'http://localhost:8080/1706545/Approve';
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
                this.getRecordForPage(this.state.currentPage)
            })
            .catch((error) => {
                console.error('Error:', error);
                this.getRecordForPage(this.state.currentPage)
            });
        //refreshForOrderList
        this.getRecordForPage(this.state.currentPage)
        //uncheck post approve
        if(this.state.checkedId!==-1)
        document.getElementById(this.state.checkedId).click()
    }

    //REJECT LOGIC
    onReject(){
        // Save to backend
        var orderID = this.state.orderList[this.state.checkedId.toString().substr(9)].orderID
        //API HERE
        //CALL approve?orderID&level ->reject
        var reqdata = {
            "orderID": orderID,
            "approvalStatus": "Rejected",
        }
        var url = 'http://localhost:8080/1706545/Reject';
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
                this.getRecordForPage(this.state.currentPage)
            })
            .catch((error) => {
                console.error('Error:', error);
                this.getRecordForPage(this.state.currentPage)
            });
        //refreshForOrderList
        this.getRecordForPage(this.state.currentPage)
        //uncheck post reject
        if(this.state.checkedId!==-1)
        document.getElementById(this.state.checkedId).click()
    }

    //SEARCH LOGIC
    onSearch(event){
        if(event.key ==='Enter'){
            //searchBackedWithFilter
            //fill orderList
            var url = 'http://localhost:8080/1706545/Search?id='+this.state.searchValueText
            fetch(url, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ orderList: data })
                    console.log('orderList:', data);
                })
                .catch((error) => {
                    this.setState({ orderList: [] })
                    console.error('Error:', error);
                });
            //set page number to 1 and total page to 1
            this.setState({
                currentPage:1,
                totalPage:1
            })
        }
    }
    onSearchTextChange(e){
        this.setState({searchValueText:e.target.value})
        if(e.target.value===""){
            console.log("Reset Search")
            this.getRecordForPage(1)
            this.setState({currentPage:1})
        }
    }

    //PAGINATION
    onFirstPage(){
        this.setState({currentPage:1})
        this.getRecordForPage(1)
    }
    onPrevPage(){
        var page = this.state.currentPage-1
        if(page<1)
        page =1
        this.setState({currentPage:page})
        this.getRecordForPage(page)
    }
    onNextPage(){
        var page = this.state.currentPage+1
        if(page>this.state.totalPage)
        page =this.state.totalPage
        this.setState({currentPage:page})
        this.getRecordForPage(page)
    }
    onLastPage(){
        this.setState({currentPage:this.state.totalPage})
        this.getRecordForPage(this.state.totalPage)
    }

    getRecordForPage(page){
        //Call Api with page number
        console.log("Get record for page " +page)
        var url = 'http://localhost:8080/1706545/order?page='+page
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ orderList: data })
                console.log('orderList:', data);
            })
            .catch((error) => {
                this.setState({ orderList: [] })
                console.error('Error:', error);
            });
        //Set Record dataList
        //Update TotalPage
        var url = 'http://localhost:8080/1706545/tPage';
        fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ totalPage: data.totalPage })
                console.log('totalPage:', data.totalPage);
            })
            .catch((error) => {
                this.setState({ totalPage: 1 })
                console.error('totalPage:', error);
            });
        
    }

    //APPROVE REJECT LOGIC

    render(){
        return(
            <div>
                <div>
                <img src={HRC} className="left"/>
                <img src={ABC} className="center"/>
                <br/>
                </div>

                <div className="content">
                        {this.state.level===0?
                        <div>
                        <button className="button" onClick={this.onAdd}>ADD</button>
                        {this.state.checkedId!==-1?
                        <button className="button" onClick={this.onEdit}>EDIT</button>
                        :<button className="buttondisabled" disabled>EDIT</button>}
                        <input className="searchbox" type ="search" onKeyPress={this.onSearch} onChange={this.onSearchTextChange} value = {this.state.searchValueText} placeholder="Search"/>
                        </div>
                        :null}

                        {this.state.level!==0?
                        <div>
                        {(this.state.checkedId!==-1)?
                        <div>
                        <button className="button" onClick={this.onApprove}>APPROVE</button>
                        <button className="button" onClick={this.onReject}>REJECT</button>
                        <input className="searchbox" type ="search" onKeyPress={this.onSearch} onChange={this.onSearchTextChange} value = {this.state.searchValueText} placeholder="Search"/>
                        </div>
                        :
                        <div>
                        <button className="buttondisabled" disabled>APPROVE</button>
                        <button className="buttondisabled" disabled>REJECT</button>
                        <input className="searchbox" type ="search" onKeyPress={this.onSearch} onChange={this.onSearchTextChange} value = {this.state.searchValueText} placeholder="Search"/>
                        </div>
                        }
                        </div>
                        :null}

                        <br/>
                        <table className="tableWhole">
                            <thead>
                            <tr className='headrow' >
                                <th> Select</th>
                                <th> Order Date </th>
                                <th> Approved By </th>
                                <th> Order ID </th>
                                <th> Company Name </th>
                                <th> Company ID </th>
                                <th> Order Amount </th>
                                <th> Approval Status </th>
                                <th> Notes </th>
                            </tr>
                            </thead>
                            <hr className='hrdesign'/>
                            <br/>
                            <tbody>
                        {
                        
                            this.state.orderList.map(
                                (rowData,key)=>{
                                    if(key%2==0)
                                    return(
                                    <tr className='tablerow' id={key}>
                                        <td> <label><input className="checkbox" type ="checkbox" id={"tableData"+key} onChange={this.onCheck} name="tableCheck" /> </label> </td>
                                        <td>{rowData.orderDate}</td>
                                        <td>{rowData.approvedBy}</td>
                                        <td>{rowData.orderID}</td>
                                        <td>{rowData.companyName}</td>
                                        <td>{rowData.companyID}</td>
                                        <td>{rowData.orderAmount}</td>
                                        <td>{rowData.approvalStatus}</td>
                                        <td>{rowData.Notes}</td>
                                    </tr>)
                                    else
                                    return(
                                        <tr className='tablerowalt' id={key}>
                                            <td> <label><input type ="checkbox" id={"tableData"+key} onChange={this.onCheck} name="tableCheck" /> </label> </td>
                                            <td>{rowData.orderDate}</td>
                                            <td>{rowData.approvedBy}</td>
                                            <td>{rowData.orderID}</td>
                                            <td>{rowData.companyName}</td>
                                            <td>{rowData.companyID}</td>
                                            <td>{rowData.orderAmount}</td>
                                            <td>{rowData.approvalStatus}</td>
                                            <td>{rowData.Notes}</td>
                                        </tr>)
                                }
                            )
                           
                        }
                        </tbody>
                        </table>
                        <br/>
                        <div className="fontNormal">
                            {this.state.currentPage===1
                            ?<button className="pagedisbaled" onClick={this.onFirstPage.bind(this)} disabled>{'<<'}</button>
                            :<button className="page" onClick={this.onFirstPage.bind(this)}>{'<<'}</button>
                            }
                            {this.state.currentPage===1
                            ?<button className="pagedisbaled" onClick={this.onPrevPage.bind(this)} disabled>{'< '}</button>
                            :<button className="page" onClick={this.onPrevPage.bind(this)}>{'< '}</button>
                            }
                            Page
                            <button className="page">{this.state.currentPage}</button>
                            of {this.state.totalPage}
                            {this.state.currentPage===this.state.totalPage
                            ?<button className="pagedisbaled" onClick={this.onNextPage.bind(this)}disabled>{'> '}</button>
                            :<button className="page" onClick={this.onNextPage.bind(this)}>{'> '}</button>
                            }
                            {this.state.currentPage===this.state.totalPage
                            ?<button className="pagedisbaled" onClick={this.onLastPage.bind(this)}disabled>{'>>'}</button>
                            :<button className="page" onClick={this.onLastPage.bind(this)}>{'>>'}</button>
                            }
                        
                        </div>
                    </div>
                    <AddPopup show={this.state.addMode} setShow={this.hideAddPopup}/>
                        { this.state.checkedId===-1?null:
                        <div>
                        <EditPopup show={this.state.editMode} setShow={this.hideEditPopup}
                        orderID = {this.state.orderList[this.state.checkedId.toString().substr(9)].orderID}
                        orderAmount = { this.state.orderList[this.state.checkedId.toString().substr(9)].orderAmount}
                        Notes ={ this.state.orderList[this.state.checkedId.toString().substr(9)].Notes}
                        approvalStatus ={ this.state.orderList[this.state.checkedId.toString().substr(9)].approvalStatus}
                        approvalBy ={ this.state.orderList[this.state.checkedId.toString().substr(9)].orderAmount<=10000?"David_Lee":this.state.orderList[this.state.checkedId.toString().substr(9)].orderAmount>50000?"Matthew_Vance":"Laura_Smith"}
                        />
                        </div>
                        }
            </div>
        )
    }

}

export default Dash;