package fr.cpe.rest.impl;

import java.util.List;
import javax.inject.Inject;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;
import fr.cpe.rest.IUserRestWS;
import fr.cpe.services.IUserService;


public class UserRestWS implements IUserRestWS {
	@Inject
	IUserService userService;
	 
	
	@Override
	public List<UserModel> listUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserResponseModel login(UserModel user) {
		System.out.println(user.toString());
		UserResponseModel u = userService.serviceLogin(user);
		if(!u.equals(null)) {
			return u;
		} else {
			return null;
		}
	}

}
