package fr.cpe.dao;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;

public interface IUserDAO {
	
	UserResponseModel authUser(UserModel user);
}
