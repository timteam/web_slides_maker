package fr.cpe.model;



public class UserModel {

	private String login;
	

	private String pwd;
	
	public UserModel(String login, String pwd) {
		super();
		this.login = login;
		this.pwd = pwd;
	}

	public UserModel() {
		super();
		// TODO Auto-generated constructor stub
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
