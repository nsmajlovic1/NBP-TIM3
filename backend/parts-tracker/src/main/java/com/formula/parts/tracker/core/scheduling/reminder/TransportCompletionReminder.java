package com.formula.parts.tracker.core.scheduling.reminder;

import com.formula.parts.tracker.core.service.transport.TransportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class TransportCompletionReminder {

    private final TransportService transportService;

    @Value("${scheduling.reminder.transportFinish.enabled:false}")
    private Boolean enabled;

    @Scheduled(cron = "${scheduling.reminder.transportFinish.cron}")
    public void sendReminders() {
        if (Boolean.FALSE.equals(enabled)) {
            return;
        }

        log.info("Enter TransportFinishReminder");
        transportService.sendTransportCompletionReminders();
        log.info("Exit TransportFinishReminder");
    }

}
