package demin.d.utilitiesback.security.oauth2.userDetails;


import demin.d.utilitiesback.security.userDetails.OAuth2UserDetails;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface OAuth2UserDetailsConverter {
    OAuth2UserDetails convert(OAuth2User oAuth2User);

    boolean isCurrentOAuth2Type(OAuth2UserRequest userRequest);
}
