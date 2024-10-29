package my.innovation.new_projet2.service.impl;

import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.EmployeeDto;
import my.innovation.new_projet2.entity.Department;
import my.innovation.new_projet2.entity.Employee;
import my.innovation.new_projet2.exception.ResourceNotFoundException;
import my.innovation.new_projet2.mapper.EmployeeMapper;
import my.innovation.new_projet2.repository.DemandCongeRepository;
import my.innovation.new_projet2.repository.EmployeeRepository;
import my.innovation.new_projet2.service.DepartmentService;
import my.innovation.new_projet2.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentService departmentService;
    private DemandCongeRepository demandCongeRepository;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = findEmployeeById(employeeId);
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployeeDto) {
        Employee employee = findEmployeeById(employeeId);

        employee.setFirstName(updateEmployeeDto.getFirstName());
        employee.setLastName(updateEmployeeDto.getLastName());
        employee.setEmail(updateEmployeeDto.getEmail());

        if (updateEmployeeDto.getDepartmentId() != null) {
            Department department = departmentService.findById(updateEmployeeDto.getDepartmentId());
            employee.setDepartment(department);
        }

        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employé non trouvé avec l'ID: " + employeeId);
        }
        employeeRepository.deleteById(employeeId);
    }

    private Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("L'employé n'existe pas avec cet ID: " + employeeId));
    }
}
