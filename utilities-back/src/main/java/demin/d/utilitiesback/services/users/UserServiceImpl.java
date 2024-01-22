package demin.d.utilitiesback.services.users;


import demin.d.utilitiesback.repositories.users.entities.User;
import demin.d.utilitiesback.exceptions.NotFoundException;
import demin.d.utilitiesback.repositories.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserByUsernameOrThrow(String username) {
        return findUserByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User addOrUpdateUser(User user) {
        return userRepository.save(user);
    }
}
