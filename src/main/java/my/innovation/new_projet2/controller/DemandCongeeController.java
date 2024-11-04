package my.innovation.new_projet2.controller;

import lombok.AllArgsConstructor;
import my.innovation.new_projet2.dto.DemandCongeeDto;
import my.innovation.new_projet2.service.DemandCongeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RequestMapping("/api/demandes-conge")
@AllArgsConstructor
@Validated
public class DemandCongeeController {

    private final DemandCongeeService demandCongeeService;

    @PostMapping
    public ResponseEntity<DemandCongeeDto> createDemandConge(@Valid @RequestBody DemandCongeeDto demandCongeeDto) {
        DemandCongeeDto createdDemandConge = demandCongeeService.createDemandConge(demandCongeeDto);
        return new ResponseEntity<>(createdDemandConge, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandCongeeDto> getDemandCongeById(@PathVariable Long id) {
        DemandCongeeDto demandConge = demandCongeeService.getDemandCongeById(id);
        return ResponseEntity.ok(demandConge);
    }

    @GetMapping
    public ResponseEntity<List<DemandCongeeDto>> getAllDemandesConge() {
        List<DemandCongeeDto> allDemandesConge = demandCongeeService.getAllDemandesConge();
        return ResponseEntity.ok(allDemandesConge);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandCongeeDto> updateDemandConge(
            @PathVariable Long id,
            @Valid @RequestBody DemandCongeeDto demandCongeeDto) {
        DemandCongeeDto updatedDemandConge = demandCongeeService.updateDemandConge(id, demandCongeeDto);
        return ResponseEntity.ok(updatedDemandConge);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemandConge(@PathVariable Long id) {
        demandCongeeService.deleteDemandConge(id);
        return ResponseEntity.noContent().build();
    }
}
