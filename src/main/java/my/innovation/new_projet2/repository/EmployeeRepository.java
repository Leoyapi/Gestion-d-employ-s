package my.innovation.new_projet2.repository;


import my.innovation.new_projet2.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
