package com.howmuch.mapper;

import java.util.List;

import com.howmuch.domain.BoardVO;

public interface BoardMapper {
	
	public BoardVO getData();
	
	public List<BoardVO> getList();
	
	public int updateData(BoardVO vo);
	
	public void register(BoardVO vo);
	
	public void delete(int bno);

	public List<BoardVO> selectSearchList();
}
