package com.howmuch.mapper;

import java.util.List;

import com.howmuch.domain.SampleVO;

public interface SampleMapper {
	public SampleVO getData();
	
	public List<SampleVO> getList();
	
	public int updateData(SampleVO vo);
	
	public void register(SampleVO vo);
	
	public void delete(int id);
}
