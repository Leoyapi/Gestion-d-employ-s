package my.innovation.new_projet2.repository;

import my.innovation.new_projet2.entity.DemandCongee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandCongeeRepository extends JpaRepository<DemandCongee, Long> {

}
