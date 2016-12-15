package fr.cpe.ejb.impl;

import javax.annotation.Resource;

import javax.ejb.LocalBean; 
import javax.ejb.Stateless; 
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.Message;
import javax.jms.Queue;

import fr.cpe.ejb.MessageReceiverSyncLocal;
import fr.cpe.model.UserResponseModel;

 
@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {
 
	
	@Inject //injection de dépendances
	JMSContext context;

	@Resource(mappedName = "java:/jms/queue/watcherQueue") //indique nom du bean à injecter
	Queue queue; //Retour de l'EJB msg driven
	 
	public UserResponseModel receiveMessage() {
		JMSConsumer conso = context.createConsumer(queue);
		
		Message message = conso.receive(1000);
		
		if (message instanceof UserResponseModel){
			return (UserResponseModel) message;
		} else {
			return null;
		}
	 
	}
 
}
 