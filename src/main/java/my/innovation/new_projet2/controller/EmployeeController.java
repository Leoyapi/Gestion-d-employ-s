package my.innovation.new_projet2.controller;



import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.EmployeeDto;
import my.innovation.new_projet2.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
@AllArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        logger.info("Creating employee: {}", employeeDto);
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        logger.info("Fetching employee with ID: {}", employeeId);
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        logger.info("Fetching all employees");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
                                                      @RequestBody EmployeeDto updateEmployee) {
        logger.info("Updating employee with ID: {} and data: {}", employeeId, updateEmployee);
        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updateEmployee);
        return ResponseEntity.ok(employeeDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
        logger.info("Deleting employee with ID: {}", employeeId);
        try {
            employeeService.deleteEmployee(employeeId);
            return ResponseEntity.ok("Employé supprimé avec succès");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employé non trouvé");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression de l'employé");
        }
    }


}

