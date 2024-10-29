package my.innovation.new_projet2.service;

import my.innovation.new_projet2.entity.User;
import my.innovation.new_projet2.exception.ResourceNotFoundException;
import my.innovation.new_projet2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAll() {
        return userRepository.findAll(); // Méthode pour récupérer tous les utilisateurs
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'ID: " + id));
    }

    public User updateUser(Long id, User userDetails) {
        User user = findById(id); // Cette méthode lancera une exception si l'utilisateur n'est pas trouvé
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword())); // Ne pas encoder le mot de passe si le mot de passe n'a pas changé
        // Mettez à jour d'autres champs si nécessaire
        return userRepository.save(user);
    }
}
