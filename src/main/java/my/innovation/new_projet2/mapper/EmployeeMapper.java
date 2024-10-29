package my.innovation.new_projet2.mapper;

import my.innovation.new_projet2.dto.EmployeeDto;
import my.innovation.new_projet2.entity.Department;
import my.innovation.new_projet2.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        Long departmentId = (employee.getDepartment() != null) ? employee.getDepartment().getId() : null;

        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                departmentId
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );

        // Crée un objet Department uniquement si departmentId n'est pas nul
        if (employeeDto.getDepartmentId() != null) {
            Department department = new Department();
            department.setId(employeeDto.getDepartmentId());
            employee.setDepartment(department);
        }

        return employee;
    }
}
