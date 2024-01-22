package demin.d.utilitiesback.repositories.users.entities;


import demin.d.utilitiesback.security.oauth2.OAuth2Type;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String username;
    private String name;
    private String email;
    private String role;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private OAuth2Type oAuth2Type;

    public User(String username,
                String name,
                String email,
                String role,
                String imageUrl,
                OAuth2Type oAuth2Type) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
        this.imageUrl = imageUrl;
        this.oAuth2Type = oAuth2Type;
    }
}
