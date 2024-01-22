package demin.d.utilitiesback.controllers;

import demin.d.utilitiesback.contracts.users.User;
import demin.d.utilitiesback.security.userDetails.OAuth2UserDetails;
import demin.d.utilitiesback.services.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/current")
    public User getCurrentUser(@AuthenticationPrincipal OAuth2UserDetails currentUser) {
        var dbUser = userService.getUserByUsernameOrThrow(currentUser.getUsername());

        var user = new User();
        user.setId(dbUser.getId());
        user.setName(dbUser.getName());
        user.setImageUrl(dbUser.getImageUrl());

        return user;
    }
}