package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ParroquiaTerritorioTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ParroquiaTerritorio getParroquiaTerritorioSample1() {
        return new ParroquiaTerritorio().id(1L).codigo("codigo1").nombre("nombre1");
    }

    public static ParroquiaTerritorio getParroquiaTerritorioSample2() {
        return new ParroquiaTerritorio().id(2L).codigo("codigo2").nombre("nombre2");
    }

    public static ParroquiaTerritorio getParroquiaTerritorioRandomSampleGenerator() {
        return new ParroquiaTerritorio()
            .id(longCount.incrementAndGet())
            .codigo(UUID.randomUUID().toString())
            .nombre(UUID.randomUUID().toString());
    }
}
