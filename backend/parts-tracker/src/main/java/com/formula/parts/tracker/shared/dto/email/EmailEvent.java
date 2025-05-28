package com.formula.parts.tracker.shared.dto.email;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class EmailEvent extends ApplicationEvent {

    private final EmailRequest emailRequest;

    public EmailEvent(final Object source, final EmailRequest emailRequest) {
        super(source);
        this.emailRequest = emailRequest;
    }

}
