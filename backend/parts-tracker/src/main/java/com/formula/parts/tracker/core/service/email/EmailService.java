package com.formula.parts.tracker.core.service.email;

import com.formula.parts.tracker.shared.dto.email.EmailRequest;
import com.formula.parts.tracker.shared.enums.EmailSubject;
import com.formula.parts.tracker.shared.exception.ApiException;

public interface EmailService {

    void sendPlaintextEmail(final EmailSubject subject, final String recipientEmailAddress,
        final String text);

    void sendEmail(final EmailRequest request) throws ApiException;

}
