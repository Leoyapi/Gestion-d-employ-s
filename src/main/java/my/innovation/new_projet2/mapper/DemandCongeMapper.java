package my.innovation.new_projet2.mapper;

import my.innovation.new_projet2.dto.DemandCongeDto;
import my.innovation.new_projet2.entity.DemandConge;

public class DemandCongeMapper {

    // Méthode pour mapper DemandCongeDto vers DemandConge
    public static DemandConge mapToDemandConge(DemandCongeDto demandCongeDto) {
        if (demandCongeDto == null) {
            return null; // Si le DTO est nul, retourner nul
        }

        DemandConge demandConge = new DemandConge();
        demandConge.setId(demandCongeDto.getId());
        // Ici, vous devrez probablement charger les entités Employee et Department basées sur les IDs
        // demandConge.setEmployee(employeeRepository.findById(demandCongeDto.getEmployeeId()).orElse(null));
        // demandConge.setDepartment(departmentRepository.findById(demandCongeDto.getDepartmentId()).orElse(null));
        demandConge.setStartDate(demandCongeDto.getStartDate());
        demandConge.setEndDate(demandCongeDto.getEndDate());
        demandConge.setTypeConges(demandCongeDto.getTypeConges());
        demandConge.setStatus(demandCongeDto.getStatus());

        return demandConge;
    }

    // Méthode pour mapper DemandConge vers DemandCongeDto
    public static DemandCongeDto mapToDemandCongeDto(DemandConge demandConge) {
        if (demandConge == null) {
            return null; // Si l'entité est nulle, retourner nul
        }

        DemandCongeDto demandCongeDto = new DemandCongeDto();
        demandCongeDto.setId(demandConge.getId());
        demandCongeDto.setEmployeeId(demandConge.getEmployee().getId());
        demandCongeDto.setDepartmentId(demandConge.getDepartment().getId());
        demandCongeDto.setStartDate(demandConge.getStartDate());
        demandCongeDto.setEndDate(demandConge.getEndDate());
        demandCongeDto.setTypeConges(demandConge.getTypeConges());
        demandCongeDto.setStatus(demandConge.getStatus());

        return demandCongeDto;
    }
}
