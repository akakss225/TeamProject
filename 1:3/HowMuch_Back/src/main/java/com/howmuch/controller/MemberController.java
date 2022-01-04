package com.howmuch.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.howmuch.domain.MemberVO;
import com.howmuch.domain.Rank2VO;
import com.howmuch.domain.RankVO;
import com.howmuch.security.CustomUserDetailsService;
import com.howmuch.service.MemberService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "http://localhost:3000")
@Log4j
@RestController
public class MemberController {
	
	@Setter(onMethod_ = @Autowired)
	private MemberService service;
	
	@Setter(onMethod_ = @Autowired)
	private CustomUserDetailsService custom;
	
	
	// 회원가입
	@PostMapping(value="/signUp")
	public @ResponseBody void signUp(@RequestBody MemberVO vo) {
		log.info("회원가입 정보----");
		log.info("email : " + vo.getEmail());
		log.info("nick : " + vo.getNick());
		service.signUp(vo);
	}
	
	@GetMapping(value="/findEmail")
	public @ResponseBody MemberVO findEmail(@RequestParam String email) {
		return service.findEmail(email);
	}
	
	@GetMapping(value="/findNick")
	public @ResponseBody MemberVO findNick(@RequestParam String nick) {
		return service.findNick(nick);
	}
	
	
	// 마이페이지 내 정보
	@GetMapping("/userinfo")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody MemberVO info(Principal principal) {
		
		log.info(principal);
		
		MemberVO vo = service.read(principal.getName());
		
		return vo;
	}
	
	// 메인페이지 로그인 여부 확인
	@GetMapping("/checklogin")
	public boolean check(Principal principal) {
		
		if(principal == null) {
			return false;
		}
		
		return true;
	}
	
	
	// 마이페이지 게시판랭크
	@GetMapping("/BoardRank")
	public @ResponseBody List<RankVO> rank1() {
		log.info("==========================");
		log.info("My Page");
		
		List<RankVO> rvo = service.getRankByPosting();
		
		return rvo;
		
	}
	
	// 마이페이지 티어랭크
	@GetMapping("/TierRank")
	public @ResponseBody List<Rank2VO> rank2(){
		
		log.info("Rank2");
		List<Rank2VO> rvo = service.getRankByTier();
		
		for(Rank2VO vo : rvo) {
			if(vo.getPoint() < 250) {
				vo.setTier("Bronze");
			}
			else if(vo.getPoint() < 500) {
				vo.setTier("Silver");
			}
			else if(vo.getPoint() < 750) {
				vo.setTier("Gold");
			}
			else if(vo.getPoint() < 1000) {
				vo.setTier("Platinum");
			}
			else {
				vo.setTier("Diamond");
			}
		}
		return rvo;
	}
		
	
}
