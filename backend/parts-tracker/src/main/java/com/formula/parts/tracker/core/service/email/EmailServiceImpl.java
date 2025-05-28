package com.formula.parts.tracker.core.service.email;

import com.formula.parts.tracker.shared.dto.email.EmailRequest;
import com.formula.parts.tracker.shared.enums.EmailSubject;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.InternalServerException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${email.sender.name}")
    private String emailSenderName;

    @Override
    public void sendPlaintextEmail(final EmailSubject subject, final String recipientEmailAddress,
        final String text) {
        final SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(emailSenderName);
        simpleMailMessage.setSentDate(new Date());
        simpleMailMessage.setTo(recipientEmailAddress);
        simpleMailMessage.setSubject(subject.getValue());
        simpleMailMessage.setText(text);

        javaMailSender.send(simpleMailMessage);
    }

    @Override
    public void sendEmail(final EmailRequest request) throws ApiException {
        try {
            final MimeMessage message = javaMailSender.createMimeMessage();

            final MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(String.join(",", request.getTo()));
            helper.setSubject(request.getSubject());
            helper.setText(buildEmailContent(request.getContext(), request.getTemplatePath()),
                true);

            javaMailSender.send(message);
        } catch (final MessagingException exception) {
            throw new InternalServerException(exception.getMessage());
        }
    }

    private String buildEmailContent(final Map<String, Object> contextData,
        final String templatePath) {
        final Context context = new Context();
        context.setVariables(contextData);

        return templateEngine.process(templatePath, context);
    }

}
