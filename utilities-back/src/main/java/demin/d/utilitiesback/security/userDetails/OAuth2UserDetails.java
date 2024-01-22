package demin.d.utilitiesback.security.userDetails;

import demin.d.utilitiesback.security.oauth2.OAuth2Type;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;
import java.util.UUID;

@Data
public class OAuth2UserDetails implements OAuth2User, UserDetails {
    private UUID id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String avatarUrl;
    private OAuth2Type provider;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
