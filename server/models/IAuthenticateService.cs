 public interface IAuthenticateService {
     bool IsAuthenticated (TokenRequest request, out string token);
 }

 public interface IUserManagementService {
     bool IsValidUser (string username, string password);
 }