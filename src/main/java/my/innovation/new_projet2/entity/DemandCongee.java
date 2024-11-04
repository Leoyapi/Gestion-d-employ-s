package my.innovation.new_projet2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "demandes_conge")
public class DemandCongee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique de la demande de congé

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    private LocalDate startDate; // Date de début du congé
    private LocalDate endDate; // Date de fin du congé

    @Enumerated(EnumType.STRING)
    private TypeConges typeConges;

    private String status; // Statut de la demande (par exemple, approuvé, en attente, refusé)
}
