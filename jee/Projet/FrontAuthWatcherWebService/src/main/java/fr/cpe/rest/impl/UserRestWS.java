package fr.cpe.rest.impl;

import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

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
		if (u ==  null) {
			throw new WebApplicationException(Response.Status.UNAUTHORIZED);
		}
		return u;

	}

	@Override
	public String noUser() {
		return "Bad Credential";
	}

}
