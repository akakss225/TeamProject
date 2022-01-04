package com.howmuch.security;

import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
	"file:src/main/webapp/WEB-INF/spring/root-context.xml",
	"file:src/main/webapp/WEB-INF/spring/security-context.xml"
})
@Log4j
public class MemberTests {
	
	@Setter(onMethod_ = @Autowired)
	private BCryptPasswordEncoder pwencoder;
	
	@Setter(onMethod_ = @Autowired)
	private DataSource ds;
	
	@Test
	public void testInsertMember() {
		String sql = "insert into hm_member(email, nick, pw) values(?, ?, ?)";
		
		for(int i = 0; i < 5; i++) {
			
			Connection con = null;
			PreparedStatement pstmt = null;
			
			try {
				con = ds.getConnection();
				pstmt = con.prepareStatement(sql);
				
				pstmt.setString(3, pwencoder.encode("pw4" + i));
				
				if(i < 2) {
					pstmt.setString(1, "user4" + i + "@naver.com");
					pstmt.setString(2, "user4" + i);
					
					
				}
				else if(i <= 3) {
					pstmt.setString(1, "manager4" + i + "@naver.com");
					pstmt.setString(2, "manager4" + i);
					
				}
				else {
					pstmt.setString(1, "admin4" + i + "@naver.com");
					pstmt.setString(2, "admin4" + i);
	
				}
				pstmt.executeUpdate();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			finally {
				if(pstmt != null) {try {pstmt.close();}catch(Exception e) {} }
				if(con != null) {try {con.close();}catch(Exception e) {} }
			}
			
		}
		
		String sql2 = "insert into hm_member_auth values(?, ?)";
		
		for(int i = 0; i < 5; i++) {
			Connection con = null;
			PreparedStatement pstmt = null;
			
			try {
				con = ds.getConnection();
				pstmt = con.prepareStatement(sql2);
				
				
				if(i < 2) {
					pstmt.setString(1, "user4" + i + "@naver.com");
					pstmt.setString(2, "ROLE_USER");
					
					
				}
				else if(i <= 3) {
					pstmt.setString(1, "manager4" + i + "@naver.com");
					pstmt.setString(2, "ROLE_MANAGER");
					
				}
				else {
					pstmt.setString(1, "admin4" + i + "@naver.com");
					pstmt.setString(2, "ROLE_ADMIN");
	
				}
				pstmt.executeUpdate();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			finally {
				if(pstmt != null) {try {pstmt.close();}catch(Exception e) {} }
				if(con != null) {try {con.close();}catch(Exception e) {} }
			}
		}
	}
}
