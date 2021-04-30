package com.tmi.tmi.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Method {
	private String name;
	private Counter instruction;
	private Counter line;
	private Counter complexity;
	private Counter method;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Counter getInstruction() {
		return instruction;
	}
	public void setInstruction(Counter instruction) {
		this.instruction = instruction;
	}
	public Counter getLine() {
		return line;
	}
	public void setLine(Counter line) {
		this.line = line;
	}
	public Counter getComplexity() {
		return complexity;
	}
	public void setComplexity(Counter complexity) {
		this.complexity = complexity;
	}
	public Counter getMethod() {
		return method;
	}
	public void setMethod(Counter method) {
		this.method = method;
	}
}
