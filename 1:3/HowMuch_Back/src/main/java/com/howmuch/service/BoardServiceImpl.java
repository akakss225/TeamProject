package com.howmuch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.howmuch.domain.BoardVO;
import com.howmuch.mapper.BoardMapper;

import lombok.Setter;

@Service
public class BoardServiceImpl implements BoardService {
	

	@Setter(onMethod_ = @Autowired)
	private BoardMapper mapper;
	
	@Override
	public BoardVO get() {

		return mapper.getData();
	}

	@Override
	public List<BoardVO> getList() {

		return mapper.getList();
	}

	@Override
	public List<BoardVO> update(BoardVO vo) {
		
		if(mapper.updateData(vo) < 1) {
			return null;
		}
		
		return mapper.getList();
	}

	@Override
	public List<BoardVO> register(BoardVO vo) {
		
		mapper.register(vo);
		
		return mapper.getList();
	}

	@Override
	public List<BoardVO> delete(int bno) {
		
		mapper.delete(bno);
		
		return mapper.getList();
	}

	@Override
	public List<BoardVO> getSearchList() {

		return mapper.selectSearchList();
	}

}
