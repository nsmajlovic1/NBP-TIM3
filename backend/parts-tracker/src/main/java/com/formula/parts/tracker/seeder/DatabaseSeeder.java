package com.formula.parts.tracker.seeder;

import com.formula.parts.tracker.seeder.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final AddressSeeder addressSeeder;
    private final TeamSeeder teamSeeder;
    private final StorageSeeder storageSeeder;
    private final DriverSeeder driverSeeder;
    private final CarPartSeeder carPartSeeder;
    private final TransportCompanySeeder transportCompanySeeder;
    private final TransportSeeder transportSeeder;
    private final ShipmentSeeder shipmentSeeder;
    private final PackageSeeder packageSeeder;

    public DatabaseSeeder(
            AddressSeeder addressSeeder,
            TeamSeeder teamSeeder,
            DriverSeeder driverSeeder,
            StorageSeeder storageSeeder,
            CarPartSeeder carPartSeeder,
            TransportCompanySeeder transportCompanySeeder,
            TransportSeeder transportSeeder,
            ShipmentSeeder shipmentSeeder, PackageSeeder packageSeeder
    ) {
        this.addressSeeder = addressSeeder;
        this.teamSeeder = teamSeeder;
        this.driverSeeder = driverSeeder;
        this.storageSeeder = storageSeeder;
        this.carPartSeeder = carPartSeeder;
        this.transportCompanySeeder = transportCompanySeeder;
        this.transportSeeder = transportSeeder;
        this.shipmentSeeder = shipmentSeeder;
        this.packageSeeder = packageSeeder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔧 Starting database seeding...");

        addressSeeder.seed();      // Insert addresses first
        teamSeeder.seed();
        driverSeeder.seed();
        storageSeeder.seed();
        carPartSeeder.seed();
        transportCompanySeeder.seed();
        transportSeeder.seed();
        shipmentSeeder.seed();
        packageSeeder.seed();
        System.out.println("✅ Database seeding completed.");
    }
}
