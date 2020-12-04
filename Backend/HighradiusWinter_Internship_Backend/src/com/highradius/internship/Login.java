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
public class Login extends HttpServlet{

	//GET TOTAL PAGE COUNT
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		System.out.println("GET Here");
		String id= req.getParameter("id");
		String pass=  req.getParameter("pass");
		System.out.println(id+pass);
		resp.setContentType("application/json");
		Boolean allow = false;
		  if(id.equals("David_Lee") && pass.equals("Project@123") )
	            allow=true;
	      else if(id.equals("Laura_Smith") && pass.equals("Project@1234"))
	        	allow=true;
	      else if(id.equals("Matthew_Vance") && pass.equals("Project@12345") )
	        	allow=true;	      
		JsonObject record = new JsonObject();
		record.addProperty("allow", allow);
		PrintWriter out = resp.getWriter();
		out.println(record);
	
	}
	

}
