package com.howmuch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.howmuch.domain.SampleVO;
import com.howmuch.mapper.SampleMapper;

import lombok.Setter;

@Service
public class SampleServiceImpl implements SampleService { 
	
	@Setter(onMethod_ = @Autowired)
	private SampleMapper mapper;
	
	@Override
	public SampleVO get() {
		// TODO Auto-generated method stub
		return mapper.getData();
	}

	@Override
	public SampleVO update(SampleVO vo) {
		// TODO Auto-generated method stub
		
		if(mapper.updateData(vo) < 1 ) {
			return null;
		};
				
		return mapper.getData();
	}

	@Override
	public List<SampleVO> getList() {
		// TODO Auto-generated method stub
		return mapper.getList();
	}

	@Override
	public List<SampleVO> register(SampleVO vo) {
		// TODO Auto-generated method stub
		mapper.register(vo);
		return mapper.getList();
	}

	@Override
	public List<SampleVO> delete(int id) {
		// TODO Auto-generated method stub
		mapper.delete(id);
		return mapper.getList();
	}

}
