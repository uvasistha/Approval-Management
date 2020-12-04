package com.highradius.internship;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.org.apache.xpath.internal.operations.Or;

/**
 * @author KIIT
 *
 */
public class Add extends HttpServlet{

	//GET BY PAGE NO
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		System.out.println("GET Here");
		Integer page=  Integer.parseInt(req.getParameter("page"));
		Integer endpage;
			endpage =page*10;
			page = endpage-10+1;
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
	      String query ="select * from order_details";// limit "+page+","+endpage;
	      ResultSet rs = null;
		    try {
		      rs = stmt.executeQuery(query);
		    } catch (SQLException e) {	      
		      e.printStackTrace();
		    }
		    JsonArray array = new JsonArray(); 
		    int count = 0;
		    try {
		    	while(rs.next()) {
		    		if(count>=page && count <=endpage) {
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
		    		count++;
		    	}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		PrintWriter out = resp.getWriter();
        out.println(array);
	
	}

	//ADD NEW
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
		System.out.println("POST Here");
		
		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = null;
		try {
		  InputStream inputStream = req.getInputStream();
		  if (inputStream != null) {
		   bufferedReader = new BufferedReader(new InputStreamReader(
		inputStream));
		   char[] charBuffer = new char[128];
		   int bytesRead = -1;
		   while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
		    stringBuilder.append(charBuffer, 0, bytesRead);
		   }
		  } else {
		   stringBuilder.append("");
		  }
		} catch (IOException ex) {
		  throw ex;
		} finally {
		  if (bufferedReader != null) {
		   try {
		    bufferedReader.close();
		   } catch (IOException ex) {
		    throw ex;
		   }
		  }
		}
		String body = stringBuilder.toString();
		//System.out.println(body);
		Gson g = new Gson();
		Order odr = g.fromJson(body, Order.class);
		

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
		    

		    String sql = "insert  into order_details (`Order_ID`,`Customer_Name`,`Customer_ID`,`Order_Amount`,`Approval_Status`,`Approved_By`,`Notes`,`Order_Date`) "
		    		+ "values ("
		    		+odr.getOrderID()+", "
		    		+"'"+odr.getCompanyName()+"', "
		    		+odr.getCompanyID()+", "
		    		+odr.getOrderAmount()+", "
		    		+"'"+odr.getApprovalStatus()+"', "
		    		+"'"+odr.getApprovedBy()+"', "
		    		+"'"+odr.getNotes()+"', "
		    		+"'"+odr.getOrderDate()+"')";
		  System.out.println(sql);
	      int rs ;
		    try {
		      rs = stmt.executeUpdate(sql);
		    } catch (SQLException e) {	      
		      e.printStackTrace();
		    }
	}
	
	
	

}
