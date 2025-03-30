package com.formula.parts.tracker.core.service.email;

import com.formula.parts.tracker.shared.enums.EmailSubject;

public interface EmailService {

    void sendPlaintextEmail(final EmailSubject subject, final String recipientEmailAddress,
        final String text);

}
