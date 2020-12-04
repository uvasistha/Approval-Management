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
public class GetTotalPage extends HttpServlet{

	//GET TOTAL PAGE COUNT
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		System.out.println("GET Here");
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
	      String query ="select * from order_details";
	      ResultSet rs = null;
		    try {
		      rs = stmt.executeQuery(query);
		    } catch (SQLException e) {	      
		      e.printStackTrace();
		    } 
		    JsonObject record = new JsonObject();
		    Integer count =0;
		    try {
		    	while(rs.next()) {
		    		count++;      
		    	}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    //System.out.println(count);
		    Double double1=Math.ceil(count/10.0);
		    //System.out.println(double1);
		    Integer integer1 = double1.intValue();
		    //System.out.println(integer1);
		    record.addProperty("totalPage", integer1);
		PrintWriter out = resp.getWriter();
        out.println(record);
	
	}
	

}
