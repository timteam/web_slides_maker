package fr.cpe.ejb.impl;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import fr.cpe.ejb.MessageSenderQueueLocal;
import fr.cpe.model.UserResponseModel;

/**
 * Session Bean implementation class MessageSenderQueue
 */
@Stateless
@LocalBean
public class MessageSenderQueue implements MessageSenderQueueLocal {

	@Inject
	JMSContext context;

	@Resource(mappedName = "java:/jms/queue/watcherQueue") //indique nom du bean à injecter
	Queue queue;

	/**
	 * Default constructor. 
	 */
	public MessageSenderQueue() {
	}

	@Override
	public void sendMessage(String message) {
		context.createProducer().send(queue, message);
	}

	@Override
	public void sendMessage(UserResponseModel user) {
		try {
			ObjectMessage message = context.createObjectMessage();
			message.setObject(user);
			context.createProducer().send(queue, user);
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
