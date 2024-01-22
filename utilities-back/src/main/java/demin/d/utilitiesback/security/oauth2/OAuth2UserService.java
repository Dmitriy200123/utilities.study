package demin.d.utilitiesback.security.oauth2;


import demin.d.utilitiesback.repositories.users.entities.User;
import demin.d.utilitiesback.security.userDetails.OAuth2UserDetails;
import demin.d.utilitiesback.security.WebSecurityConfig;
import demin.d.utilitiesback.security.oauth2.userDetails.OAuth2UserDetailsConverter;
import demin.d.utilitiesback.services.users.UserService;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final UserService userService;
    private final List<OAuth2UserDetailsConverter> oAuth2UserDetailsConverters;

    public OAuth2UserService(UserService userService,
                             List<OAuth2UserDetailsConverter> oAuth2UserDetailsConverters) {
        this.userService = userService;
        this.oAuth2UserDetailsConverters = oAuth2UserDetailsConverters;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        var oAuth2User = super.loadUser(userRequest);

        var oAuth2UserDetailsConverter = oAuth2UserDetailsConverters.stream()
                .filter(converter -> converter.isCurrentOAuth2Type(userRequest))
                .findFirst();
        if (oAuth2UserDetailsConverter.isEmpty()) {
            throw new InternalAuthenticationServiceException("The OAuth2 provider is not supported yet");
        }

        var userDetails = oAuth2UserDetailsConverter.get().convert(oAuth2User);
        var user = AddOrUpdateUser(userDetails);
        userDetails.setId(user.getId());

        return userDetails;
    }

    private User AddOrUpdateUser(OAuth2UserDetails OAuth2UserDetails) {
        var userOptional = userService.findUserByUsername(OAuth2UserDetails.getUsername());

        User user;

        if (userOptional.isEmpty()) {
            user = new User();
            user.setUsername(OAuth2UserDetails.getUsername());
            user.setName(OAuth2UserDetails.getName());
            user.setEmail(OAuth2UserDetails.getEmail());
            user.setImageUrl(OAuth2UserDetails.getAvatarUrl());
            user.setOAuth2Type(OAuth2UserDetails.getProvider());
            user.setRole(WebSecurityConfig.USER);
        } else {
            user = userOptional.get();
            user.setEmail(OAuth2UserDetails.getEmail());
            user.setImageUrl(OAuth2UserDetails.getAvatarUrl());
        }

        return userService.addOrUpdateUser(user);
    }
}
