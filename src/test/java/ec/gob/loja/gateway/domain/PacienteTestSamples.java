package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class PacienteTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Paciente getPacienteSample1() {
        return new Paciente()
            .id(1L)
            .lugarNacimiento("lugarNacimiento1")
            .callePrincipal("callePrincipal1")
            .numeroCasa("numeroCasa1")
            .calleSecundaria("calleSecundaria1")
            .barrio("barrio1")
            .referenciaDomicilio("referenciaDomicilio1")
            .seguroSaludSecundario("seguroSaludSecundario1")
            .identificacionRepresentante("identificacionRepresentante1");
    }

    public static Paciente getPacienteSample2() {
        return new Paciente()
            .id(2L)
            .lugarNacimiento("lugarNacimiento2")
            .callePrincipal("callePrincipal2")
            .numeroCasa("numeroCasa2")
            .calleSecundaria("calleSecundaria2")
            .barrio("barrio2")
            .referenciaDomicilio("referenciaDomicilio2")
            .seguroSaludSecundario("seguroSaludSecundario2")
            .identificacionRepresentante("identificacionRepresentante2");
    }

    public static Paciente getPacienteRandomSampleGenerator() {
        return new Paciente()
            .id(longCount.incrementAndGet())
            .lugarNacimiento(UUID.randomUUID().toString())
            .callePrincipal(UUID.randomUUID().toString())
            .numeroCasa(UUID.randomUUID().toString())
            .calleSecundaria(UUID.randomUUID().toString())
            .barrio(UUID.randomUUID().toString())
            .referenciaDomicilio(UUID.randomUUID().toString())
            .seguroSaludSecundario(UUID.randomUUID().toString())
            .identificacionRepresentante(UUID.randomUUID().toString());
    }
}
