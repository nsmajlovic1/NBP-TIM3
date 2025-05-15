package com.formula.parts.tracker.shared.dto.transport;

import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.dto.pkg.PackageResponse;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String type;
    private String vehicleNumber;
    private TransportCompanyResponse company;
    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;
    private Integer capacity;
    private String status;
    private AddressResponse departureAddress;
    private AddressResponse destinationAddress;

    private List<PackageResponse> packages;

}
