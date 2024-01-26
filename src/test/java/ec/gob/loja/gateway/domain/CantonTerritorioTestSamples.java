package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CantonTerritorioTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CantonTerritorio getCantonTerritorioSample1() {
        return new CantonTerritorio().id(1L).codigo("codigo1").nombre("nombre1");
    }

    public static CantonTerritorio getCantonTerritorioSample2() {
        return new CantonTerritorio().id(2L).codigo("codigo2").nombre("nombre2");
    }

    public static CantonTerritorio getCantonTerritorioRandomSampleGenerator() {
        return new CantonTerritorio()
            .id(longCount.incrementAndGet())
            .codigo(UUID.randomUUID().toString())
            .nombre(UUID.randomUUID().toString());
    }
}
