package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ContactoEmergenciaPacienteTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ContactoEmergenciaPaciente getContactoEmergenciaPacienteSample1() {
        return new ContactoEmergenciaPaciente().id(1L).nombre("nombre1").telefono("telefono1").direccion("direccion1");
    }

    public static ContactoEmergenciaPaciente getContactoEmergenciaPacienteSample2() {
        return new ContactoEmergenciaPaciente().id(2L).nombre("nombre2").telefono("telefono2").direccion("direccion2");
    }

    public static ContactoEmergenciaPaciente getContactoEmergenciaPacienteRandomSampleGenerator() {
        return new ContactoEmergenciaPaciente()
            .id(longCount.incrementAndGet())
            .nombre(UUID.randomUUID().toString())
            .telefono(UUID.randomUUID().toString())
            .direccion(UUID.randomUUID().toString());
    }
}
