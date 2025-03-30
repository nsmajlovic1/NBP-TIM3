package com.formula.parts.tracker.shared.validation.validator;

import com.formula.parts.tracker.shared.validation.annotation.Password;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<Password, String> {

    @Override
    public boolean isValid(final String value, final ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        final String passwordStructureRegex = "^(?=.*\\d)(?=.*[$#&%])[a-zA-Z0-9$#&%]{8,}$";
        return Pattern.matches(passwordStructureRegex, value);
    }

}
