package com.formula.parts.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:database.properties")
@PropertySource("classpath:email.properties")
public class PartsTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PartsTrackerApplication.class, args);
    }

}
