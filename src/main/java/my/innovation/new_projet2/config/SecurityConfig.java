package my.innovation.new_projet2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Injection des dépendances
    private final JwtFilter jwtFilter;  // Filtre JWT pour la vérification des tokens JWT dans les requêtes
    private final UserDetailsService customUserDetailsService;  // Service qui gère les informations utilisateur

    // Constructeur pour injecter les dépendances
    @Autowired
    public SecurityConfig(JwtFilter jwtFilter, UserDetailsService customUserDetailsService) {
        this.jwtFilter = jwtFilter;
        this.customUserDetailsService = customUserDetailsService;
    }

    // Création du bean AuthenticationManager pour la gestion des authentifications
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Bean pour encoder les mots de passe (ici BCrypt est utilisé)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuration globale pour spécifier comment authentifier les utilisateurs
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, PasswordEncoder passwordEncoder) throws Exception {
        // Utilisation du customUserDetailsService pour authentifier les utilisateurs avec un encodage des mots de passe
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder);
    }

    // Bean qui définit la configuration de la chaîne de filtres de sécurité
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configuration des règles CORS pour permettre les requêtes cross-origin
                .csrf(csrf -> csrf.disable()) // Désactivation de la protection CSRF (utile pour les API stateless)
                .authorizeHttpRequests(auth -> auth
                        // Routes publiques accessibles sans authentification
                        .requestMatchers("/api/register", "/api/login", "/api/users").permitAll()

                        // Autoriser toutes les requêtes GET  sans authentification
                        .requestMatchers(HttpMethod.GET, "/api/employees", "/api/employees/*",
                                "/api/departments","/api/departments/*","/api/demandes-conge","/api/demandes-conge/*").permitAll()

                        // Autoriser POST sans authentification
                        .requestMatchers(HttpMethod.POST, "/api/employees","/api/demandes-conge","/api/departments").permitAll()

                        // Autoriser PUT  sans authentification
                        .requestMatchers(HttpMethod.PUT, "/api/employees/*","/api/departments/*","/api/demandes-conge/*").permitAll()

                        //  DELETE   authentification
                        .requestMatchers(HttpMethod.DELETE, "/api/employees/*","/api/demandes-conge/*","/api/departments/*").authenticated()

                        // Exiger une authentification pour toutes les autres requêtes
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Gestion des sessions en mode stateless (pas de sessions persistantes)
                );

        // Ajout du filtre JWT pour vérifier le token avant les filtres de sécurité par défaut
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build(); // Retourne l'objet HttpSecurity configuré
    }

    // Configuration CORS (Cross-Origin Resource Sharing) pour permettre les requêtes depuis le frontend (http://localhost:5173)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Autoriser l'origine du frontend (localhost:5173)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Autoriser certaines méthodes HTTP
        configuration.setAllowCredentials(true); // Autoriser l'envoi des informations d'authentification (ex : cookies)
        configuration.addAllowedHeader("*"); // Autoriser tous les en-têtes

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration); // Appliquer la configuration CORS à toutes les routes /api/**
        return source;
    }

}

//    @Bean
//    public SecurityFilterChain apiSecurity(HttpSecurity http) throws Exception {
//        http
//                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configure CORS
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/demo/protected").hasAnyRole("ADMIN", "USER")
//                        .requestMatchers("/demo/admin").hasRole("ADMIN")
//                        .requestMatchers("/demo/user").hasRole("USER")
//                        .requestMatchers("/demo/public").permitAll()
//                        .anyRequest().authenticated() // Allow other requests
//                )
//                .httpBasic(Customizer.withDefaults());
//
//        return http.build();
//    }
//
//    @Bean
//    public InMemoryUserDetailsManager userDetailsManager() {
//        UserDetails user = User.builder()
//                .username("user")
//                .password(passwordEncoder().encode("user"))
//                .roles("USER")
//                .build();
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("admin"))
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(user, admin);
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Spécifiez les origines autorisées
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Méthodes autorisées
//        configuration.setAllowCredentials(true); // Autoriser les informations d'identification
//        configuration.addAllowedHeader("*"); // Autoriser tous les en-têtes
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/api/**", configuration); // Appliquer la configuration CORS pour /api/**
//        return source;
//    }
//}
