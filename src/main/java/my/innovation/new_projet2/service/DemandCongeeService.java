package my.innovation.new_projet2.service;

import my.innovation.new_projet2.dto.DemandCongeeDto;

import java.util.List;

public interface DemandCongeeService {
    DemandCongeeDto createDemandConge(DemandCongeeDto demandCongeeDto);
    DemandCongeeDto getDemandCongeById(Long id);
    List<DemandCongeeDto> getAllDemandesConge();
    DemandCongeeDto updateDemandConge(Long id, DemandCongeeDto demandCongeeDto);
    void deleteDemandConge(Long id);
}
