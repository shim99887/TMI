package com.tmi.tmi.model;

public class Counter {
	private String type;
	private int missed;
	private int covered;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getMissed() {
		return missed;
	}
	public void setMissed(int missed) {
		this.missed = missed;
	}
	public int getCovered() {
		return covered;
	}
	public void setCovered(int covered) {
		this.covered = covered;
	}
	@Override
	public String toString() {
		return "Counter [type=" + type + ", missed=" + missed + ", covered=" + covered + "]";
	}
	
	
}
