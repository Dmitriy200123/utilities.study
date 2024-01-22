package demin.d.utilitiesback.services.users;


import demin.d.utilitiesback.repositories.users.entities.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByUsername(String username);

    User getUserByUsernameOrThrow(String username);

    User addOrUpdateUser(User user);
}
