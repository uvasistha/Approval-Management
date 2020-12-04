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
public class Approve extends HttpServlet{

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
		    

		    String query = "update  order_details set Approval_Status = 'Approved' where Order_ID ="+odr.getOrderID();
		  System.out.println(query);
	      int rs ;
		    try {
		      rs = stmt.executeUpdate(query);
		    } catch (SQLException e) {	      
		      e.printStackTrace();
		    }
	}
	
	
	

}
