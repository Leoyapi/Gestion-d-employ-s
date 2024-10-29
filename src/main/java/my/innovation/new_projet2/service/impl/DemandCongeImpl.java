package my.innovation.new_projet2.service.impl;

import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.DemandCongeDto;
import my.innovation.new_projet2.entity.DemandConge;
import my.innovation.new_projet2.exception.ResourceNotFoundException;
import my.innovation.new_projet2.mapper.DemandCongeMapper;
import my.innovation.new_projet2.repository.DemandCongeRepository;
import my.innovation.new_projet2.service.DemandCongeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DemandCongeImpl implements DemandCongeService {

    private final DemandCongeRepository demandCongeRepository;

    @Override
    public DemandCongeDto createDemandConge(DemandCongeDto demandCongeDto) {
        DemandConge demandConge = DemandCongeMapper.mapToDemandConge(demandCongeDto);
        DemandConge savedDemandConge = demandCongeRepository.save(demandConge);
        return DemandCongeMapper.mapToDemandCongeDto(savedDemandConge);
    }

    @Override
    public DemandCongeDto getDemandCongeById(Long id) {
        DemandConge demandConge = demandCongeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande de congé non trouvée avec l'ID: " + id));
        return DemandCongeMapper.mapToDemandCongeDto(demandConge);
    }

    @Override
    public List<DemandCongeDto> getAllDemandesConge() {
        return demandCongeRepository.findAll().stream()
                .map(DemandCongeMapper::mapToDemandCongeDto)
                .collect(Collectors.toList());
    }

    @Override
    public DemandCongeDto updateDemandConge(Long id, DemandCongeDto demandCongeDto) {
        DemandConge existingDemandConge = demandCongeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande de congé non trouvée avec l'ID: " + id));

        // Mettez à jour les champs de existingDemandConge avec les données de demandCongeDto
        existingDemandConge.setStartDate(demandCongeDto.getStartDate());
        existingDemandConge.setEndDate(demandCongeDto.getEndDate());
        existingDemandConge.setTypeConges(demandCongeDto.getTypeConges());
        existingDemandConge.setStatus(demandCongeDto.getStatus());

        DemandConge updatedDemandConge = demandCongeRepository.save(existingDemandConge);
        return DemandCongeMapper.mapToDemandCongeDto(updatedDemandConge);
    }

    @Override
    public void deleteDemandConge(Long id) {
        if (!demandCongeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Demande de congé non trouvée avec l'ID: " + id);
        }
        demandCongeRepository.deleteById(id);
    }
}
