package fr.cpe.dao.impl;

import fr.cpe.dao.IUserDAO;
import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;


import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Stateless
public class UserDAO implements IUserDAO {

    @PersistenceContext
    EntityManager em;
    
    public UserDAO(){
    	
    }
    public UserResponseModel authUser(UserModel user) {
    	//La requete se fait sur l'objet UserResponseModel et non pas directement sur la table
        UserResponseModel userToLog = (UserResponseModel)em.createQuery("from UserResponseModel u where u.login like :login and u.pwd like :pwd")
        		.setParameter("login", user.getLogin())
        		.setParameter("pwd", user.getPwd())
				.getSingleResult();
        
        return userToLog;
    }
	

}
