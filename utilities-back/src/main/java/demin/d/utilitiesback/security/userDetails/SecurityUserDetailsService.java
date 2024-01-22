package demin.d.utilitiesback.security.userDetails;


import demin.d.utilitiesback.repositories.users.entities.User;
import demin.d.utilitiesback.services.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SecurityUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        var user = userService.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", username)));
        var authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));

        return mapUserToCustomUserDetails(user, authorities);
    }

    private OAuth2UserDetails mapUserToCustomUserDetails(User user, List<SimpleGrantedAuthority> authorities) {
        OAuth2UserDetails OAuth2UserDetails = new OAuth2UserDetails();
        OAuth2UserDetails.setId(user.getId());
        OAuth2UserDetails.setUsername(user.getUsername());
        OAuth2UserDetails.setName(user.getName());
        OAuth2UserDetails.setEmail(user.getEmail());
        OAuth2UserDetails.setAuthorities(authorities);
        return OAuth2UserDetails;
    }
}
