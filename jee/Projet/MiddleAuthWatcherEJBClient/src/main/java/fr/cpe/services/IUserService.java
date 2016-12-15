package fr.cpe.services;

import java.util.List;

import javax.ejb.Local;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;

@Local
public interface IUserService {
	public List<UserResponseModel> serviceListUser();
	
	public UserResponseModel serviceLogin(UserModel user) ;
}
