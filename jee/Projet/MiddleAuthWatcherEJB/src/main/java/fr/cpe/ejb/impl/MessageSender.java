package fr.cpe.ejb.impl;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.annotation.Resource;
import javax.jms.JMSProducer;
import javax.jms.Topic;

import fr.cpe.ejb.MessageSenderLocal;
import fr.cpe.ejb.MessageSenderRemote;
import fr.cpe.model.UserModel;
/**
 * Session Bean implementation class MessageSender
 */
@Stateless //aucune valeur sauvegardée. En lecture seule -> acces concurentiel possible
@LocalBean //Session bean sans interface
public class MessageSender implements MessageSenderRemote, MessageSenderLocal {

	/**
	 * Default constructor. 
	 */
	public MessageSender() {

	}
	@Inject //injection de dépendances
	JMSContext context;

	@Resource(mappedName = "java:/jms/watcherAuthJMS") //indique nom du bean à injecter
	Topic topic; //1 sender plusieurs receiver format newsletter vs Queue = 1 to 1 car msg consomme
	//Envoi a l'EJBMD pour check BD

	public void sendMessage(String message) {
		JMSProducer prod = context.createProducer();
		prod.send(topic, message);
	}

	public void sendMessage(UserModel user) {
		JMSProducer prod = context.createProducer();
		
		prod.send(topic, user);
		

	}

}
