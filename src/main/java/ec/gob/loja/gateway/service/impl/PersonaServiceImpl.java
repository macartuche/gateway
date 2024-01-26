package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.PersonaRepository;
import ec.gob.loja.gateway.service.PersonaService;
import ec.gob.loja.gateway.service.dto.PersonaDTO;
import ec.gob.loja.gateway.service.mapper.PersonaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.Persona}.
 */
@Service
@Transactional
public class PersonaServiceImpl implements PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaServiceImpl.class);

    private final PersonaRepository personaRepository;

    private final PersonaMapper personaMapper;

    public PersonaServiceImpl(PersonaRepository personaRepository, PersonaMapper personaMapper) {
        this.personaRepository = personaRepository;
        this.personaMapper = personaMapper;
    }

    @Override
    public Mono<PersonaDTO> save(PersonaDTO personaDTO) {
        log.debug("Request to save Persona : {}", personaDTO);
        return personaRepository.save(personaMapper.toEntity(personaDTO)).map(personaMapper::toDto);
    }

    @Override
    public Mono<PersonaDTO> update(PersonaDTO personaDTO) {
        log.debug("Request to update Persona : {}", personaDTO);
        return personaRepository.save(personaMapper.toEntity(personaDTO)).map(personaMapper::toDto);
    }

    @Override
    public Mono<PersonaDTO> partialUpdate(PersonaDTO personaDTO) {
        log.debug("Request to partially update Persona : {}", personaDTO);

        return personaRepository
            .findById(personaDTO.getId())
            .map(existingPersona -> {
                personaMapper.partialUpdate(existingPersona, personaDTO);

                return existingPersona;
            })
            .flatMap(personaRepository::save)
            .map(personaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<PersonaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Personas");
        return personaRepository.findAllBy(pageable).map(personaMapper::toDto);
    }

    public Flux<PersonaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return personaRepository.findAllWithEagerRelationships(pageable).map(personaMapper::toDto);
    }

    public Mono<Long> countAll() {
        return personaRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<PersonaDTO> findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findOneWithEagerRelationships(id).map(personaMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Persona : {}", id);
        return personaRepository.deleteById(id);
    }
}
