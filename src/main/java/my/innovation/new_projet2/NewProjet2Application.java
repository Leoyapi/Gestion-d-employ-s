package my.innovation.new_projet2;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@Slf4j
@SpringBootApplication
public class NewProjet2Application {

	public static void main(String[] args) {
		SpringApplication.run(NewProjet2Application.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void startApp() {
		log.info("--------------------------------------------------------------------------- ");
		log.info("BACKEND démarré avec succès et prêt à recevoir des requêtes !");
		log.info("Accédez à l'API à l'adresse http://localhost:8080/api");
		log.info("--------------------------------------------------------------------------- ");
	}
}
