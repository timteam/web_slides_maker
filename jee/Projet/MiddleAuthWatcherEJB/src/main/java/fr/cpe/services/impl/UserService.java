package fr.cpe.services.impl;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;

import java.util.List;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;

import fr.cpe.services.IUserService;
import fr.cpe.dao.UserDAO;
import fr.cpe.ejb.MessageReceiverSyncLocal;
import fr.cpe.ejb.MessageSenderLocal;

@Stateless
public class UserService implements IUserService {
	@Inject
	UserDAO userDao;
	 
	@EJB
	MessageSenderLocal sender;
	 	 
	@EJB
	MessageReceiverSyncLocal receiver;
	
	
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
