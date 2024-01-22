package demin.d.utilitiesback.security.oauth2.userDetails;


import demin.d.utilitiesback.security.userDetails.OAuth2UserDetails;
import demin.d.utilitiesback.security.WebSecurityConfig;
import demin.d.utilitiesback.security.oauth2.OAuth2Type;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GitHubOAuth2UserInfoConverter implements OAuth2UserDetailsConverter {
    @Override
    public OAuth2UserDetails convert(OAuth2User oAuth2User) {
        var oAuth2UserDetails = new OAuth2UserDetails();

        oAuth2UserDetails.setUsername(parseAttribute("login", oAuth2User));
        oAuth2UserDetails.setName(parseAttribute("name", oAuth2User));
        oAuth2UserDetails.setEmail(parseAttribute("email", oAuth2User));
        oAuth2UserDetails.setAvatarUrl(parseAttribute("avatar_url", oAuth2User));
        oAuth2UserDetails.setProvider(OAuth2Type.GITHUB);
        oAuth2UserDetails.setAttributes(oAuth2User.getAttributes());
        oAuth2UserDetails.setAuthorities(Collections.singletonList(new SimpleGrantedAuthority(WebSecurityConfig.USER)));

        return oAuth2UserDetails;
    }

    @Override
    public boolean isCurrentOAuth2Type(OAuth2UserRequest userRequest) {
        return OAuth2Type.GITHUB.name().equalsIgnoreCase(userRequest.getClientRegistration().getRegistrationId());
    }

    private String parseAttribute(String key, OAuth2User oAuth2User) {
        var attribute = oAuth2User.getAttributes().get(key);
        return attribute == null ? "" : attribute.toString();
    }
}
