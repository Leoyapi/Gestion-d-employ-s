package my.innovation.new_projet2.service.impl;

import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.DemandCongeeDto;
import my.innovation.new_projet2.entity.DemandCongee;
import my.innovation.new_projet2.exception.ResourceNotFoundException;
import my.innovation.new_projet2.mapper.DemandCongeeMapper;
import my.innovation.new_projet2.repository.DemandCongeeRepository;
import my.innovation.new_projet2.service.DemandCongeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DemandCongeeImpl implements DemandCongeeService {

    private final DemandCongeeRepository demandCongeeRepository;

    @Override
    public DemandCongeeDto createDemandConge(DemandCongeeDto demandCongeeDto) {
        DemandCongee demandCongee = DemandCongeeMapper.mapToDemandConge(demandCongeeDto);
        DemandCongee savedDemandCongee = demandCongeeRepository.save(demandCongee);
        return DemandCongeeMapper.mapToDemandCongeDto(savedDemandCongee);
    }

    @Override
    public DemandCongeeDto getDemandCongeById(Long id) {
        DemandCongee demandCongee = demandCongeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande de congé non trouvée avec l'ID: " + id));
        return DemandCongeeMapper.mapToDemandCongeDto(demandCongee);
    }

    @Override
    public List<DemandCongeeDto> getAllDemandesConge() {
        return demandCongeeRepository.findAll().stream()
                .map(DemandCongeeMapper::mapToDemandCongeDto)
                .collect(Collectors.toList());
    }

    @Override
    public DemandCongeeDto updateDemandConge(Long id, DemandCongeeDto demandCongeeDto) {
        DemandCongee existingDemandCongee = demandCongeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande de congé non trouvée avec l'ID: " + id));

        // Mettez à jour les champs de existingDemandConge avec les données de demandCongeDto
        existingDemandCongee.setStartDate(demandCongeeDto.getStartDate());
        existingDemandCongee.setEndDate(demandCongeeDto.getEndDate());
        existingDemandCongee.setTypeConges(demandCongeeDto.getTypeConges());
        existingDemandCongee.setStatus(demandCongeeDto.getStatus());

        DemandCongee updatedDemandCongee = demandCongeeRepository.save(existingDemandCongee);
        return DemandCongeeMapper.mapToDemandCongeDto(updatedDemandCongee);
    }

    @Override
    public void deleteDemandConge(Long id) {
        if (!demandCongeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Demande de congé non trouvée avec l'ID: " + id);
        }
        demandCongeeRepository.deleteById(id);
    }
}
