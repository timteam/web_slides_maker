package fr.cpe.ejb;

import fr.cpe.model.UserResponseModel;

public interface MessageSenderLocal {

	public void sendMessage(String message);
	public void sendMessage(UserResponseModel user);
}
