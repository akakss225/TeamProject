package com.howmuch.service;

import java.util.List;

import com.howmuch.domain.CalculatorVO;
import com.howmuch.domain.LogVO;
import com.howmuch.domain.ValueVO;

public interface ValueService {
	
	public ValueVO get();
	
	public List<ValueVO> getList(); 

	public List<ValueVO> register(ValueVO pri);
	
	public List<LogVO> log(int bno);
	
	public CalculatorVO cal(int bno);
	
}
