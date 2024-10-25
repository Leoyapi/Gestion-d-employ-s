package my.innovation.new_projet2.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.EmployeeDto;
import my.innovation.new_projet2.entity.Employee;
import my.innovation.new_projet2.exception.ResourceNotFoundException;
import my.innovation.new_projet2.mapper.EmployeeMapper;
import my.innovation.new_projet2.repository.EmployeeRepository;
import my.innovation.new_projet2.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {


    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee saveEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(saveEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("L'employé n'existe pas avec cet id: " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()->new ResourceNotFoundException("L'employé avec cet id n'exsite pas" + employeeId)
        );
        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());

        Employee updateEmployee1 = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updateEmployee1);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new EntityNotFoundException("Employé non trouvé avec l'ID: " + employeeId);
        }
        employeeRepository.deleteById(employeeId);
    }


}
