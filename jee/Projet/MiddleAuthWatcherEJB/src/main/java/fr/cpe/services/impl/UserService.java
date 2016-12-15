package fr.cpe.services.impl;

import javax.ejb.Stateless;
import javax.inject.Inject;

import java.util.List;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;
import fr.cpe.services.IUserService;
import fr.cpe.dao.UserDAO;

@Stateless
public class UserService implements IUserService {
	@Inject
	UserDAO userDao;
	
	@Override
	public List<UserResponseModel> serviceListUser() {
		
		return null;
	}

	@Override
	public UserResponseModel serviceLogin(UserModel user) {
		UserResponseModel logged = userDao.authUser(user);
		
		System.out.println(logged.toString());
		return logged;
		
	}
	
}
