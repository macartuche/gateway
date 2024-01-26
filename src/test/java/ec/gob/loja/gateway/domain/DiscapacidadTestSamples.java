package ec.gob.loja.gateway.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class DiscapacidadTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Discapacidad getDiscapacidadSample1() {
        return new Discapacidad().id(1L);
    }

    public static Discapacidad getDiscapacidadSample2() {
        return new Discapacidad().id(2L);
    }

    public static Discapacidad getDiscapacidadRandomSampleGenerator() {
        return new Discapacidad().id(longCount.incrementAndGet());
    }
}
