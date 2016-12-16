package fr.cpe.model;

import javax.inject.Inject;

import fr.cpe.dao.IUserDAO;

public class DataContainer {
	@Inject
	IUserDAO userDao;
	UserResponseModel user;
	public DataContainer() {

	}

	public UserResponseModel checkUser (UserModel userReq){
		user = new UserResponseModel( "Batman", "pwd", "USER", "Wane", "Bruce");
		if (user.getLogin().equals(userReq.getLogin()) && user.getPwd().equals(userReq.getPwd())) {
			return user;
		} else {
			return null;
		}

	}


}
