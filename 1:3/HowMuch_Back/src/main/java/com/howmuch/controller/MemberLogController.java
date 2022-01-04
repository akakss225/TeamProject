package com.howmuch.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.howmuch.domain.MemberVO;
import com.howmuch.domain.Rank2VO;
import com.howmuch.domain.RankVO;
import com.howmuch.service.MemberService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "*")
@Log4j
@Controller
public class MemberLogController {
	
		@Setter(onMethod_ = @Autowired)
		private MemberService service;
	
		// 로그인
//		@GetMapping("/customLogin")
//		public void loginInput(String error, String logout, Model model) {
//			
//			log.info("=============================");
//			log.info("error : " + error);
//			
//			log.info("logout : " + logout);
//			
//			if(error != null){
//		    	model.addAttribute("error", "로그인 에러");
//		    }
//		    if(logout != null){
//		    	model.addAttribute("logout", "로그아웃됨");
//		    }
//		    
//		}
		
//		// 로그아웃
//		@GetMapping("/customLogout")
//		public void logoutGET() {
//			log.info("get logout");
//		}
//		
//		// 로그아웃
//		@PostMapping("/customLogout")
//		public void logoutPOST() {
//			log.info("post logout");
//		}
		
		
		@GetMapping("/member")
		@PreAuthorize("isAuthenticated()")
		public void member() {
			log.info("success");
		}
		
		@GetMapping("/myPage")
		@PreAuthorize("isAuthenticated()")
		public void myPage(Principal principal, Model model) {
			log.info("==========================");
			log.info("My Page");
			log.info(principal.getName());
			
			MemberVO vo = service.read(principal.getName());
			List<RankVO> rvo = service.getRankByPosting();
			List<Rank2VO> mvo = service.getRankByTier();
			
			if(vo.getPoint() < 250) {
				model.addAttribute("grade", "Bronze");
			}
			else if(vo.getPoint() < 500) {
				model.addAttribute("grade", "Silver");
			}
			else if(vo.getPoint() < 750) {
				model.addAttribute("grade", "Gold");
			}
			else if(vo.getPoint() < 1000) {
				model.addAttribute("grade", "Platinum");
			}
			else {
				model.addAttribute("grade", "Diamond");
			}
			
			model.addAttribute("RankByPosting", rvo);
			model.addAttribute("RankByTier", mvo);
			
		}
		
		@GetMapping("/logout")
		public String logout() {
			
			return "redirect:http://localhost:3000";
		}
		
}
