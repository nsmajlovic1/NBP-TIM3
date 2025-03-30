package com.formula.parts.tracker.advice;

import com.formula.parts.tracker.shared.dto.error.ApiError;
import com.formula.parts.tracker.shared.dto.error.ApiErrorResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import io.swagger.v3.oas.annotations.Hidden;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Hidden
@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(
        final MethodArgumentNotValidException exception) {
        final BindingResult bindingResult = exception.getBindingResult();
        final List<FieldError> fieldErrors = bindingResult.getFieldErrors();

        return ResponseEntity.badRequest().body(createApiModelValidationErrorResponse(fieldErrors,
            DefaultMessageSourceResolvable::getDefaultMessage));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleMissingRequestBody(
        final HttpMessageNotReadableException exception) {
        return ResponseEntity.badRequest().body(
            new ApiErrorResponse(
                List.of(
                    new ApiError("Request body is not properly set."))));
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ApiErrorResponse> handeInvalidMediaType(
        final HttpMediaTypeNotSupportedException exception) {
        return ResponseEntity.badRequest().body(
            new ApiErrorResponse(
                List.of(
                    new ApiError("Defined media type is not supported."))));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiErrorResponse> handeInvalidMediaType(
        final HttpRequestMethodNotSupportedException exception) {
        return ResponseEntity.badRequest().body(
            new ApiErrorResponse(
                List.of(
                    new ApiError("Defined request method is not supported."))));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentialsException(
        final BadCredentialsException badCredentialsException) {
        final List<ApiError> errors = new ArrayList<>();
        errors.add(
            new ApiError("Provided credentials are invalid."));

        return new ResponseEntity<>(new ApiErrorResponse(errors), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiErrorResponse> handleApiException(final ApiException exception) {
        final List<ApiError> errors = new ArrayList<>();
        errors.add(new ApiError(exception.getMessage()));

        return new ResponseEntity<>(new ApiErrorResponse(errors), exception.getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(final Exception exception) {
        final List<ApiError> errors = new ArrayList<>();
        errors.add(new ApiError("Something went wrong."));

        return new ResponseEntity<>(new ApiErrorResponse(errors), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private <T> ApiErrorResponse createApiModelValidationErrorResponse(
        Collection<T> errorCollection,
        Function<T, String> errorMessageGetter) {
        if (errorCollection == null || errorCollection.isEmpty()) {
            return new ApiErrorResponse(new ArrayList<>());
        }

        return new ApiErrorResponse(errorCollection.stream()
            .map(error -> new ApiError(errorMessageGetter.apply(error)))
            .toList());
    }

}
