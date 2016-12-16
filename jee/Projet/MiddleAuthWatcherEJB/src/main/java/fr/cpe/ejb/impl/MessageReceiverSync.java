package fr.cpe.ejb.impl;

import fr.cpe.ejb.MessageReceiverSyncLocal;
import fr.cpe.ejb.MessageReceiverSyncRemote;
import fr.cpe.model.UserResponseModel;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
/**
 * Session Bean implementation class MessageReceiverSync
 */
@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncRemote, MessageReceiverSyncLocal {

    /**
     * Default constructor. 
     */
    public MessageReceiverSync() {
    }
    
    @Inject //injection de dépendances
	JMSContext context;

	@Resource(mappedName = "java:/jms/queue/watcherQueue") //indique nom du bean à injecter
	Queue queue; //Retour de l'EJB msg driven
	 
	public UserResponseModel receiveMessage() {
		JMSConsumer conso = context.createConsumer(queue);
		
		Message message = conso.receive(1000);
		
		if (message instanceof ObjectMessage){
			try {ObjectMessage obj = (ObjectMessage)message;
			
				return (UserResponseModel) (obj.getObject());
			} catch (JMSException e) {
				e.printStackTrace();
				return null;
			}
		} else {
			return null;
		}
	 
	}

}
