package my.innovation.new_projet2.service;

import my.innovation.new_projet2.dto.DemandCongeDto;

import java.util.List;

public interface DemandCongeService {
    DemandCongeDto createDemandConge(DemandCongeDto demandCongeDto);
    DemandCongeDto getDemandCongeById(Long id);
    List<DemandCongeDto> getAllDemandesConge();
    DemandCongeDto updateDemandConge(Long id, DemandCongeDto demandCongeDto);
    void deleteDemandConge(Long id);
}
