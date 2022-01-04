package com.howmuch.mapper;

import java.util.List;

import com.howmuch.domain.MemberVO;
import com.howmuch.domain.Rank2VO;
import com.howmuch.domain.RankVO;

public interface MemberMapper {
	// 회원가입
	public void signUp1(MemberVO vo);
	public void signUp2(MemberVO vo);
	
	// security에서 username으로 아이디 읽어오기
	public MemberVO read(String email);
	
	// 게시물 랭킹 >> 조회수 + 좋아요
	public List<RankVO> getRankByPosting();
	
	// 등급 랭킹 >> 티어표
	public List<Rank2VO> getRankByTier();
	
	// 중복확인 email
	public MemberVO findEmail(String email);
	
	// 중복확인 nick
	public MemberVO findNick(String nick);
	
}
