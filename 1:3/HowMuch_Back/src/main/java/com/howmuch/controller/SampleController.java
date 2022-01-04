package com.howmuch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.howmuch.domain.SampleVO;
import com.howmuch.service.SampleService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/sample/*")
@Log4j
@Controller
public class SampleController {
	
	@Setter(onMethod_ = @Autowired)
	private SampleService service;
	
	@RequestMapping("/doC")
	public @ResponseBody SampleVO doC() {
		
		SampleVO vo = new SampleVO();
		
		vo.setName("제이슨 데이터 이다.");
		vo.setAge(999);
			
		return vo;
	}
	
	@GetMapping("/read")
	public @ResponseBody SampleVO read() {
		return service.get();
	}
	
	@GetMapping("/readList")
	public @ResponseBody List<SampleVO> readList(){
		return service.getList();
	}
	
	@PostMapping(value="/update")
	public @ResponseBody SampleVO update(@RequestBody SampleVO vo) {
		log.info(vo.getName());
		log.info(vo.getAge());
		
		
		return service.update(vo);
	}
	
	@PostMapping(value="/register")
	public @ResponseBody List<SampleVO> register(@RequestBody SampleVO vo){
		
		log.info(vo.getName());
		
		return service.register(vo);
	}
	
	@DeleteMapping(value="/delete")
	public @ResponseBody List<SampleVO> delete(@RequestParam(value="id") int id){
		
		log.info(id);
		
		return service.delete(id);
		
	}
	
	
	
}
