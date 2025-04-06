package com.formula.parts.tracker.shared.dto.transportcompany;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportCompanyRequest implements Serializable {
    private String name;
    private String description;
}