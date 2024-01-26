package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ProvinciaTerritorioTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ProvinciaTerritorio getProvinciaTerritorioSample1() {
        return new ProvinciaTerritorio().id(1L).codigo("codigo1").nombre("nombre1").pais("pais1");
    }

    public static ProvinciaTerritorio getProvinciaTerritorioSample2() {
        return new ProvinciaTerritorio().id(2L).codigo("codigo2").nombre("nombre2").pais("pais2");
    }

    public static ProvinciaTerritorio getProvinciaTerritorioRandomSampleGenerator() {
        return new ProvinciaTerritorio()
            .id(longCount.incrementAndGet())
            .codigo(UUID.randomUUID().toString())
            .nombre(UUID.randomUUID().toString())
            .pais(UUID.randomUUID().toString());
    }
}
