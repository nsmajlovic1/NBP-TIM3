package com.formula.parts.tracker.core.listener;

import com.formula.parts.tracker.core.service.email.EmailService;
import com.formula.parts.tracker.shared.dto.email.EmailEvent;
import com.formula.parts.tracker.shared.dto.email.EmailRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class EmailListener {

    private final EmailService emailService;

    public EmailListener(final EmailService emailService) {
        this.emailService = emailService;
    }

    @EventListener
    public void onEmailEvent(final EmailEvent event) {
        final EmailRequest request = event.getEmailRequest();

        try {
            emailService.sendEmail(request);
        } catch (final Exception exception) {
            log.error("Failed to send email [to={}, subject={}] due to error: {}",
                request.getTo(), request.getSubject(), exception.getMessage(), exception);
        }
    }

}
