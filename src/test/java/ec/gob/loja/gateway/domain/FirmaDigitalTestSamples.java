package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FirmaDigitalTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static FirmaDigital getFirmaDigitalSample1() {
        return new FirmaDigital().id(1L).path("path1");
    }

    public static FirmaDigital getFirmaDigitalSample2() {
        return new FirmaDigital().id(2L).path("path2");
    }

    public static FirmaDigital getFirmaDigitalRandomSampleGenerator() {
        return new FirmaDigital().id(longCount.incrementAndGet()).path(UUID.randomUUID().toString());
    }
}
