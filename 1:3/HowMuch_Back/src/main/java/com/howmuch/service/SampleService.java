package com.howmuch.service;

import java.util.List;

import com.howmuch.domain.SampleVO;

public interface SampleService {
	
	public SampleVO get();
	
	public List<SampleVO> getList();
	
	public SampleVO update(SampleVO vo);
	
	public List<SampleVO> register(SampleVO vo);
	
	public List<SampleVO> delete(int id);
	
	
}
