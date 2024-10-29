package my.innovation.new_projet2.service;

import lombok.AllArgsConstructor;
import my.innovation.new_projet2.entity.Department;
import my.innovation.new_projet2.exception.ResourceNotFoundException;
import my.innovation.new_projet2.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<Department> findAll() {
        return departmentRepository.findAll();
    }

    public Department findById(Long id) {
        return departmentRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Department not found with id: " + id));
    }

    public Department save(Department department) {
        return departmentRepository.save(department);
    }

    public void delete(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }

    public Department update(Long id, Department department) {
        Department existingDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));

        existingDepartment.setName(department.getName());
        return departmentRepository.save(existingDepartment);
    }

}
