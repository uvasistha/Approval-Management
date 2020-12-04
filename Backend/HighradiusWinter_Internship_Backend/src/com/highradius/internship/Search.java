package com.highradius.internship;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * @author KIIT
 *
 */
public class Search extends HttpServlet{

	//GET TOTAL PAGE COUNT
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		System.out.println("GET Here");
		Integer id=  Integer.parseInt(req.getParameter("id"));
		resp.setContentType("application/json");
		//DatabaseCode
		String url = "jdbc:mysql://localhost:3306/winter_internship";
	      String userName = "root";
	      String password = "root";
		      try {
		      Class.forName("com.mysql.cj.jdbc.Driver");
		      } catch (ClassNotFoundException e) {
		      e.printStackTrace();
		      }
	      Connection con = null;
		    try {
		      con = DriverManager.getConnection(url,userName,password);
		    } catch (SQLException e) {
		      e.printStackTrace();
		    }
	      Statement stmt = null;
		    try {
		      stmt = con.createStatement();
		    } catch (SQLException e) {
		      e.printStackTrace();
		    }
	      String query ="select * from order_details where Order_ID="+id;
	      System.out.println(query);
	      ResultSet rs = null;
		    try {
		      rs = stmt.executeQuery(query);
		    } catch (SQLException e) {	      
		      e.printStackTrace();
		    }
		    JsonArray array = new JsonArray();  
		    try {
		    	while(rs.next()) {
		    		JsonObject record = new JsonObject();
			        record.addProperty("orderID", rs.getInt("Order_ID"));
			        record.addProperty("companyName", rs.getString("Customer_Name"));
			        record.addProperty("companyID", rs.getString("Customer_ID"));
			        record.addProperty("orderAmount", rs.getFloat("Order_Amount"));
			        record.addProperty("approvalStatus", rs.getString("Approval_Status"));
			        record.addProperty("approvedBy", rs.getString("Approved_By"));
			        record.addProperty("Notes", rs.getString("Notes"));
			        record.addProperty("orderDate", rs.getString("Order_Date"));
			        array.add(record);
		    	}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		PrintWriter out = resp.getWriter();
      out.println(array);
	
	}
	

}
