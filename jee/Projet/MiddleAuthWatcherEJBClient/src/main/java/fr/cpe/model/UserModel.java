package fr.cpe.model;

import java.io.Serializable;

public class UserModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	private String login;
	

	private String pwd;
	
	public UserModel(String login, String pwd) {
		super();
		this.login = login;
		this.pwd = pwd;
	}

	public UserModel() {
		super();
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	
	
	
}
