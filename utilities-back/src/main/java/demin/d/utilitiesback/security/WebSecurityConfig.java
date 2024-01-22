package demin.d.utilitiesback.security;

import demin.d.utilitiesback.security.apiTokens.TokenAuthenticationFilter;
import demin.d.utilitiesback.security.oauth2.AuthenticationSuccessHandler;
import demin.d.utilitiesback.security.oauth2.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    private final OAuth2UserService oauth2UserService;
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    private final TokenAuthenticationFilter tokenAuthenticationFilter;

    public static final String USER = "USER";

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                        .requestMatchers("/api/users", "/api/users/**").hasAnyAuthority(USER)
                        .requestMatchers("/api/request-statistics", "/api/request-statistics/**").hasAnyAuthority(USER)
                        .requestMatchers("/api/converters", "/api/converters/**").hasAnyAuthority(USER)
                        .requestMatchers("/public/**", "/auth/**", "/oauth2/**").permitAll()
                        .requestMatchers("/", "/error", "/csrf").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2Login -> {
                    oauth2Login.userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig.userService(oauth2UserService));
                    oauth2Login
                            .successHandler(authenticationSuccessHandler);
                })
                .logout(l -> l.logoutSuccessUrl("/").permitAll())
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }
}
