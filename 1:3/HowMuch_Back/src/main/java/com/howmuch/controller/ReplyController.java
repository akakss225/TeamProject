package com.howmuch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.howmuch.domain.ReplyVO;
import com.howmuch.service.ReplyService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "*")
@RestController
@Log4j
public class ReplyController {
	
		@Setter(onMethod_ = @Autowired)
		private ReplyService service;
	 
		@GetMapping("/ReadReply")
	   public @ResponseBody ReplyVO get() {
			return service.get();
	   }
	   
	   @GetMapping("/ReadReplyList")
	   public @ResponseBody List<ReplyVO> readList(){
	      return service.getList();
	   }
	  
	   @PostMapping(value="/UpdateReply")
	   public @ResponseBody ReplyVO update(@RequestBody ReplyVO reply) {
	      
	      log.info(reply.getReplyer());
	      log.info(reply.getRcontent());
	      log.info(reply.getRno());
	      
	      return service.update(reply);
	   }
	   
	   @PostMapping(value="/InsertReply")
	   public @ResponseBody List<ReplyVO> insert(@RequestBody ReplyVO reply){
	      
	      log.info(reply.getReplyer());
	      
	      return service.insert(reply);
	   }
	   
	   @DeleteMapping(value="/DeleteReply")
	   public @ResponseBody List<ReplyVO> delete(@RequestParam(value="rno") int rno){
	      
	      log.info(rno);
	      
	      return service.delete(rno);
	      }

}
