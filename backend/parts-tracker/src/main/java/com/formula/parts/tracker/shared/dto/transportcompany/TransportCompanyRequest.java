package com.formula.parts.tracker.shared.dto.transportcompany;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class TransportCompanyRequest implements Serializable {
    private String name;
    private String description;
}
