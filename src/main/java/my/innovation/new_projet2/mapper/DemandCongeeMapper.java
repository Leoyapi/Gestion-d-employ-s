package my.innovation.new_projet2.mapper;

import my.innovation.new_projet2.dto.DemandCongeeDto;
import my.innovation.new_projet2.entity.DemandCongee;

public class DemandCongeeMapper {

    // Méthode pour mapper DemandCongeDto vers DemandConge
    public static DemandCongee mapToDemandConge(DemandCongeeDto demandCongeeDto) {
        if (demandCongeeDto == null) {
            return null; // Si le DTO est nul, retourner nul
        }

        DemandCongee demandCongee = new DemandCongee();
        demandCongee.setId(demandCongeeDto.getId());
        // Ici, vous devrez probablement charger les entités Employee et Department basées sur les IDs
        // demandConge.setEmployee(employeeRepository.findById(demandCongeDto.getEmployeeId()).orElse(null));
        // demandConge.setDepartment(departmentRepository.findById(demandCongeDto.getDepartmentId()).orElse(null));
        demandCongee.setStartDate(demandCongeeDto.getStartDate());
        demandCongee.setEndDate(demandCongeeDto.getEndDate());
        demandCongee.setTypeConges(demandCongeeDto.getTypeConges());
        demandCongee.setStatus(demandCongeeDto.getStatus());

        return demandCongee;
    }

    // Méthode pour mapper DemandConge vers DemandCongeDto
    public static DemandCongeeDto mapToDemandCongeDto(DemandCongee demandCongee) {
        if (demandCongee == null) {
            return null; // Si l'entité est nulle, retourner nul
        }

        DemandCongeeDto demandCongeeDto = new DemandCongeeDto();
        demandCongeeDto.setId(demandCongee.getId());
        demandCongeeDto.setEmployeeId(demandCongee.getEmployee().getId());
        demandCongeeDto.setDepartmentId(demandCongee.getDepartment().getId());
        demandCongeeDto.setStartDate(demandCongee.getStartDate());
        demandCongeeDto.setEndDate(demandCongee.getEndDate());
        demandCongeeDto.setTypeConges(demandCongee.getTypeConges());
        demandCongeeDto.setStatus(demandCongee.getStatus());

        return demandCongeeDto;
    }
}
