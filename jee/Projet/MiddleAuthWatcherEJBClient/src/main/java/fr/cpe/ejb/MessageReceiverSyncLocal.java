package fr.cpe.ejb;

import javax.ejb.Local;

import fr.cpe.model.UserResponseModel;

@Local
public interface MessageReceiverSyncLocal {
	public UserResponseModel receiveMessage();
}
