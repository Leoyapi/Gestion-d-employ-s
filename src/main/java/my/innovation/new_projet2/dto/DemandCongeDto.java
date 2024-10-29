package my.innovation.new_projet2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import my.innovation.new_projet2.entity.TypeConges;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DemandCongeDto {
    private Long id; // Identifiant unique de la demande
    private Long employeeId; // Identifiant de l'employé
    private Long departmentId; // Identifiant du département
    private LocalDate startDate; // Date de début du congé
    private LocalDate endDate; // Date de fin du congé
    private TypeConges typeConges; // Type de congé
    private String status; // Statut de la demande
}
