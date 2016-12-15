package fr.cpe.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="user")
public class UserResponseModel implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iduser")
    private int id;

	
	@NotNull
    @Column(name = "login", unique = true)
	protected String login;
	
	@NotNull
    @Column(name = "password")
	protected String pwd;
	
	@Column(name = "role")
	private String role;
	
	@Column(name = "lastname")
	private String lastName;
	
	@Column(name = "surname")
	private String surName;
//	
//	private boolean validOK;

	public UserResponseModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserResponseModel(String login, String pwd, String role, String lastName, String surName) {
		super();
		this.login = login;
		this.pwd = pwd;
		this.role = role;
		this.lastName = lastName;
		this.surName = surName;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

//	public boolean isValidOK() {
//		return validOK;
//	}
//
//	public void setValidOK(boolean validOK) {
//		this.validOK = validOK;
//	}

	@Override
	public String toString() {
		return "UserResponseModel [login=" + login + ", pwd=" + pwd + ", role=" + role + ", lastName=" + lastName
				+ ", surName=" + surName + "]";
	}

	
	
	
}
