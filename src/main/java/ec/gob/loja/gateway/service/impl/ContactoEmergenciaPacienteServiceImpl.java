package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.ContactoEmergenciaPacienteRepository;
import ec.gob.loja.gateway.service.ContactoEmergenciaPacienteService;
import ec.gob.loja.gateway.service.dto.ContactoEmergenciaPacienteDTO;
import ec.gob.loja.gateway.service.mapper.ContactoEmergenciaPacienteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente}.
 */
@Service
@Transactional
public class ContactoEmergenciaPacienteServiceImpl implements ContactoEmergenciaPacienteService {

    private final Logger log = LoggerFactory.getLogger(ContactoEmergenciaPacienteServiceImpl.class);

    private final ContactoEmergenciaPacienteRepository contactoEmergenciaPacienteRepository;

    private final ContactoEmergenciaPacienteMapper contactoEmergenciaPacienteMapper;

    public ContactoEmergenciaPacienteServiceImpl(
        ContactoEmergenciaPacienteRepository contactoEmergenciaPacienteRepository,
        ContactoEmergenciaPacienteMapper contactoEmergenciaPacienteMapper
    ) {
        this.contactoEmergenciaPacienteRepository = contactoEmergenciaPacienteRepository;
        this.contactoEmergenciaPacienteMapper = contactoEmergenciaPacienteMapper;
    }

    @Override
    public Mono<ContactoEmergenciaPacienteDTO> save(ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO) {
        log.debug("Request to save ContactoEmergenciaPaciente : {}", contactoEmergenciaPacienteDTO);
        return contactoEmergenciaPacienteRepository
            .save(contactoEmergenciaPacienteMapper.toEntity(contactoEmergenciaPacienteDTO))
            .map(contactoEmergenciaPacienteMapper::toDto);
    }

    @Override
    public Mono<ContactoEmergenciaPacienteDTO> update(ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO) {
        log.debug("Request to update ContactoEmergenciaPaciente : {}", contactoEmergenciaPacienteDTO);
        return contactoEmergenciaPacienteRepository
            .save(contactoEmergenciaPacienteMapper.toEntity(contactoEmergenciaPacienteDTO))
            .map(contactoEmergenciaPacienteMapper::toDto);
    }

    @Override
    public Mono<ContactoEmergenciaPacienteDTO> partialUpdate(ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO) {
        log.debug("Request to partially update ContactoEmergenciaPaciente : {}", contactoEmergenciaPacienteDTO);

        return contactoEmergenciaPacienteRepository
            .findById(contactoEmergenciaPacienteDTO.getId())
            .map(existingContactoEmergenciaPaciente -> {
                contactoEmergenciaPacienteMapper.partialUpdate(existingContactoEmergenciaPaciente, contactoEmergenciaPacienteDTO);

                return existingContactoEmergenciaPaciente;
            })
            .flatMap(contactoEmergenciaPacienteRepository::save)
            .map(contactoEmergenciaPacienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ContactoEmergenciaPacienteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContactoEmergenciaPacientes");
        return contactoEmergenciaPacienteRepository.findAllBy(pageable).map(contactoEmergenciaPacienteMapper::toDto);
    }

    public Flux<ContactoEmergenciaPacienteDTO> findAllWithEagerRelationships(Pageable pageable) {
        return contactoEmergenciaPacienteRepository.findAllWithEagerRelationships(pageable).map(contactoEmergenciaPacienteMapper::toDto);
    }

    public Mono<Long> countAll() {
        return contactoEmergenciaPacienteRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ContactoEmergenciaPacienteDTO> findOne(Long id) {
        log.debug("Request to get ContactoEmergenciaPaciente : {}", id);
        return contactoEmergenciaPacienteRepository.findOneWithEagerRelationships(id).map(contactoEmergenciaPacienteMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete ContactoEmergenciaPaciente : {}", id);
        return contactoEmergenciaPacienteRepository.deleteById(id);
    }
}
