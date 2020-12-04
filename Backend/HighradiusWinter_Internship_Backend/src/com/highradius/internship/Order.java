package com.highradius.internship;

public class Order {
        Integer orderID;
        String companyName;
        Integer companyID;
        Double orderAmount;
        String approvalStatus;
        String approvedBy;
        String Notes;
        String orderDate;
		public Integer getOrderID() {
			return orderID;
		}
		public void setOrderID(Integer orderID) {
			this.orderID = orderID;
		}
		public String getCompanyName() {
			return companyName;
		}
		public void setCompanyName(String companyName) {
			this.companyName = companyName;
		}
		public Integer getCompanyID() {
			return companyID;
		}
		public void setCompanyID(Integer companyID) {
			this.companyID = companyID;
		}
		public Double getOrderAmount() {
			return orderAmount;
		}
		public void setOrderAmount(Double orderAmount) {
			this.orderAmount = orderAmount;
		}
		public String getApprovalStatus() {
			return approvalStatus;
		}
		public void setApprovalStatus(String approvalStatus) {
			this.approvalStatus = approvalStatus;
		}
		public String getApprovedBy() {
			return approvedBy;
		}
		public void setApprovedBy(String approvedBy) {
			this.approvedBy = approvedBy;
		}
		public String getNotes() {
			return Notes;
		}
		public void setNotes(String notes) {
			Notes = notes;
		}
		public String getOrderDate() {
			return orderDate;
		}
		public void setOrderDate(String orderDate) {
			this.orderDate = orderDate;
		}
		public Order(Integer orderID, String companyName, Integer companyID, Double orderAmount, String approvalStatus,
				String approvedBy, String notes, String orderDate) {
			super();
			this.orderID = orderID;
			this.companyName = companyName;
			this.companyID = companyID;
			this.orderAmount = orderAmount;
			this.approvalStatus = approvalStatus;
			this.approvedBy = approvedBy;
			Notes = notes;
			this.orderDate = orderDate;
		}
        
        
        
}
