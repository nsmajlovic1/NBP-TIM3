package com.formula.parts.tracker.shared.dto.transport;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportCreateRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Type must be specified.")
    private String type;

    @NotBlank(message = "Vehicle number must be specified.")
    private String vehicleNumber;

    @NotNull(message = "Company ID must be specified.")
    private Long companyId;

    @NotNull(message = "Departure date must be specified.")
    private LocalDateTime departureDate;
    
    @NotNull(message = "Arrival date must be specified.")
    private LocalDateTime arrivalDate;

    @NotNull(message = "Capacity must be specified.")
    private Integer capacity;

    @NotNull(message = "Departure address ID must be specified.")
    private Long departureAddressId;

    @NotNull(message = "Destination address ID must be specified.")
    private Long destinationAddressId;

}
