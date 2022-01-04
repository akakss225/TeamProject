package com.howmuch.domain;

import lombok.Data;

@Data
public class AttachVO {
	private String uuid;
	private String path;
	private String filename;
	private boolean filetype;
	private int bno;
}
