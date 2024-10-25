package my.innovation.new_projet2.entity;

public class LoginResponse {
    private String token;
    private String message;
    private String username; // Ajout du champ username

    public LoginResponse(String token, String message, String username) {
        this.token = token;
        this.message = message;
        this.username = username; // Initialiser le champ username
    }

    // Getters et Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() { // Getter pour username
        return username;
    }

    public void setUsername(String username) { // Setter pour username
        this.username = username;
    }
}
