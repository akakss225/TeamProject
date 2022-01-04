package com.howmuch.service;

import java.util.List;

import com.howmuch.domain.BoardVO;

public interface BoardService {
	
	public BoardVO get();
	
	public List<BoardVO> getList();
	
	public List<BoardVO> update(BoardVO vo);
	
	public List<BoardVO> register(BoardVO vo);
	
	public List<BoardVO> delete(int bno);
	
	public List<BoardVO> getSearchList();
}
