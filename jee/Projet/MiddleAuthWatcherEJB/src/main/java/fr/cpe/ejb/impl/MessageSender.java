package fr.cpe.ejb.impl;

import javax.ejb.LocalBean;
import javax.ejb.Stateless; 
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.annotation.Resource;
import javax.jms.JMSProducer;
import javax.jms.Topic;

import fr.cpe.ejb.MessageSenderLocal;
import fr.cpe.model.UserResponseModel;;


@Stateless //aucune valeur sauvegardée. En lecture seule -> acces concurentiel possible

@LocalBean //Session bean sans interface
public class MessageSender  implements MessageSenderLocal{


	@Inject //injection de dépendances
	JMSContext context;

	@Resource(mappedName = "java:/jms/watcherAuthJMS") //indique nom du bean à injecter
	Topic topic; //1 sender plusieurs receiver vs Queue = 1 to 1
	//Envoi a l'EJBMD pour check BD
	
	public void sendMessage(String message) {
		JMSProducer prod = context.createProducer();

		prod.send(topic, message);
	}

	public void sendMessage(UserResponseModel user) {

		JMSProducer prod = context.createProducer();

		prod.send(topic, user);

	}
}

