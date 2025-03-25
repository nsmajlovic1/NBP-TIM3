package com.formula.parts.tracker.configuration;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    public SwaggerConfiguration() {
        super();
    }

    @Bean
    public GroupedOpenApi transportCompanyApi() {
        return GroupedOpenApi.builder()
            .group("transport-company-api")
            .packagesToScan("com.formula.parts.tracker.rest")
            .pathsToMatch("/api/transport-company/**")
            .build();
    }

}