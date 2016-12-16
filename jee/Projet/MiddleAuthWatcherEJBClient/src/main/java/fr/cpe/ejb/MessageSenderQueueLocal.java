package fr.cpe.ejb;

import javax.ejb.Local;

import fr.cpe.model.UserResponseModel;

@Local
public interface MessageSenderQueueLocal {
	public void sendMessage(String message);
	public void sendMessage(UserResponseModel user);
}
