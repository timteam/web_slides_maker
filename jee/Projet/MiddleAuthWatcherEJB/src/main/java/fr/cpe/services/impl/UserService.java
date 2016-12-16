package fr.cpe.services.impl;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import java.util.List;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;

import fr.cpe.services.IUserService;
import fr.cpe.ejb.MessageReceiverSyncLocal;
import fr.cpe.ejb.MessageSenderLocal;

@Stateless
public class UserService implements IUserService {

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
		sender.sendMessage(user);
		try {
			UserResponseModel logged = receiver.receiveMessage();

			if (logged.getLogin().isEmpty()){
				return null;
			} else {
				return logged;
			}
		} catch(Exception e){
			return null;
		}
	}

}
