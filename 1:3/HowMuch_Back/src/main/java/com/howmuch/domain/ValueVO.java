package com.howmuch.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ValueVO {
	private int vno;
	private int bno;
	private int mno;
	private String rater;
	private int price;
	private Date vdate;
}
