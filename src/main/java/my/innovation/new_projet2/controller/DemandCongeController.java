package my.innovation.new_projet2.controller;

import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.DemandCongeDto;
import my.innovation.new_projet2.service.DemandCongeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RequestMapping("/api/demandes-conge")
@AllArgsConstructor
@Validated
public class DemandCongeController {

    private final DemandCongeService demandCongeService;

    @PostMapping
    public ResponseEntity<DemandCongeDto> createDemandConge(@Valid @RequestBody DemandCongeDto demandCongeDto) {
        DemandCongeDto createdDemandConge = demandCongeService.createDemandConge(demandCongeDto);
        return new ResponseEntity<>(createdDemandConge, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandCongeDto> getDemandCongeById(@PathVariable Long id) {
        DemandCongeDto demandConge = demandCongeService.getDemandCongeById(id);
        return ResponseEntity.ok(demandConge);
    }

    @GetMapping
    public ResponseEntity<List<DemandCongeDto>> getAllDemandesConge() {
        List<DemandCongeDto> allDemandesConge = demandCongeService.getAllDemandesConge();
        return ResponseEntity.ok(allDemandesConge);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandCongeDto> updateDemandConge(
            @PathVariable Long id,
            @Valid @RequestBody DemandCongeDto demandCongeDto) {
        DemandCongeDto updatedDemandConge = demandCongeService.updateDemandConge(id, demandCongeDto);
        return ResponseEntity.ok(updatedDemandConge);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemandConge(@PathVariable Long id) {
        demandCongeService.deleteDemandConge(id);
        return ResponseEntity.noContent().build();
    }
}
