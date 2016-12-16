package fr.cpe.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import fr.cpe.model.UserModel;
import fr.cpe.model.UserResponseModel;


@Path("/User")
public interface IUserRestWS {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	List<UserModel> listUser();
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/WatcherAuth")
	UserResponseModel login(UserModel user);

}
