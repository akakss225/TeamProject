package com.howmuch.domain;

import java.util.Date;

import lombok.Data;

@Data
public class BoardVO {
	private int bno;
	private int mno;
	private String title;
	private String content;
	private String writer;
	private Date bdate;
	private int blike;
	private int bdislike;
	private int rcount;
	private String[] tagList;
	private String tag;
	private int end;
	private int suggestion;
	
	// 첨부파일 이미지
	private String[] image;
	
	// 검색필터
	private String type;
	private String keyword;
	
}
