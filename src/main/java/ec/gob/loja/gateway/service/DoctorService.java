package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.DoctorDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.Doctor}.
 */
public interface DoctorService {
    /**
     * Save a doctor.
     *
     * @param doctorDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<DoctorDTO> save(DoctorDTO doctorDTO);

    /**
     * Updates a doctor.
     *
     * @param doctorDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<DoctorDTO> update(DoctorDTO doctorDTO);

    /**
     * Partially updates a doctor.
     *
     * @param doctorDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<DoctorDTO> partialUpdate(DoctorDTO doctorDTO);

    /**
     * Get all the doctors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<DoctorDTO> findAll(Pageable pageable);

    /**
     * Get all the doctors with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<DoctorDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of doctors available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" doctor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<DoctorDTO> findOne(Long id);

    /**
     * Delete the "id" doctor.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
