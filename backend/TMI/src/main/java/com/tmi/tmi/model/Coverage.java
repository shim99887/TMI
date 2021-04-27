package com.tmi.tmi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Document(collection = "coverage")
public class Coverage {
	@Id
	private String _id;
	
	//test용 세팅
	private String email;
	private String password;
	private String nickname;
	private boolean status;
}
