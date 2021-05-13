package com.tmi.encrypt;

public interface EncryptHandler {
	
	String encrypt(String password);
	boolean isMatch(String password, String hashed);
}
