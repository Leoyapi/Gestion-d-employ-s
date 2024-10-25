package my.innovation.new_projet2.repository;

import my.innovation.new_projet2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    // Retirez ou commentez cette ligne si vous n'utilisez pas username
    // User findByUsername(String username);
}
