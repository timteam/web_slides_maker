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
		user = userDao.authUser(userReq);
		return user;
	
	}


}
