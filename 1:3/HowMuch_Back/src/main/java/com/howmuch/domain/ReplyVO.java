package com.howmuch.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ReplyVO {
	private int rno;
	private int mno;
	private int bno;
	private String replyer;
	private String rcontent;
	private Date rdate;
	private Date rupdate;
}
