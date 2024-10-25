package my.innovation.new_projet2.controller;

import my.innovation.new_projet2.entity.LoginResponse;
import my.innovation.new_projet2.entity.User;
import my.innovation.new_projet2.service.UserService;
import my.innovation.new_projet2.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User newUser = userService.register(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/users") // la liste des utilisateurs
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        System.out.println("Tentative de connexion pour l'utilisateur : " + user.getEmail());
        User existingUser = userService.findByEmail(user.getEmail());

        // Vérifiez si l'utilisateur existe
        if (existingUser == null) {
            System.out.println("Utilisateur introuvable: " + user.getEmail());
            return new ResponseEntity<>(new LoginResponse(null, "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }

        // Vérifiez si le mot de passe est correct
        boolean isPasswordMatch = passwordEncoder.matches(user.getPassword(), existingUser.getPassword());
        if (!isPasswordMatch) {
            System.out.println("Mot de passe incorrect pour: " + user.getEmail());
            return new ResponseEntity<>(new LoginResponse(null, "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }

        // Si les identifiants sont valides, générez un token JWT
        List<String> roles = existingUser.getRoles();
        String token = jwtUtil.generateToken(existingUser.getEmail(), roles);
        System.out.println("Connexion réussie pour: " + user.getEmail());

        // Renvoie le token dans la réponse
        return new ResponseEntity<>(new LoginResponse(token, "Connexion réussie"), HttpStatus.OK);
    }

}
