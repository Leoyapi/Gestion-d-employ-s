package my.innovation.new_projet2.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.naming.AuthenticationException;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    // Champ pour stocker l'ID de la ressource introuvable (facultatif)
    private String resourceId;

    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Constructeur avec ID de ressource
    public ResourceNotFoundException(String message, String resourceId) {
        super(message);
        this.resourceId = resourceId;
    }

    // Méthode pour obtenir l'ID de la ressource
    public String getResourceId() {
        return resourceId;
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authentication failed");
    }
}
