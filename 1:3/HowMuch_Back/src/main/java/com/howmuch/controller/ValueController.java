package com.howmuch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.howmuch.domain.CalculatorVO;
import com.howmuch.domain.LogVO;
import com.howmuch.domain.ValueVO;
import com.howmuch.service.ValueService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "*")
@RestController
@Log4j
public class ValueController {
	
		@Setter(onMethod_ = @Autowired)
		private ValueService service;
	
		@GetMapping("/ReadValueList")
		public @ResponseBody List<ValueVO> readList(){
	      return service.getList();
		}

	 	@PostMapping(value="/RegisterValue")
	 	public @ResponseBody List<ValueVO> register(@RequestBody ValueVO pri){
	      
	      log.info(pri.getPrice());
	      log.info(pri.getBno());
	      
	      return service.register(pri);
	   }
		
		@GetMapping(value="/log")
		public @ResponseBody List<LogVO> log(@RequestParam(value="bno") int bno){
				
			log.info("log.............."+bno);
			
			return service.log(bno);
		}
		
		@GetMapping(value="/cal")
		public @ResponseBody CalculatorVO cal(@RequestParam(value="bno") int bno){
			
			CalculatorVO cal = service.cal(bno);
			
			cal.setAvg(Math.round(cal.getAvg()));
			
			return cal;
		}
}
