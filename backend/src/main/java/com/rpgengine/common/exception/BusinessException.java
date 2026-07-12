package com.rpgengine.common.exception;

public class BusinessException extends RuntimeException {
    private final String code;
    private final Object details;

    public BusinessException(String message) {
        this("BUSINESS_ERROR", message, null);
    }

    public BusinessException(String code, String message) {
        this(code, message, null);
    }

    public BusinessException(String code, String message, Object details) {
        super(message);
        this.code = code;
        this.details = details;
    }

    public String getCode() {
        return code;
    }

    public Object getDetails() {
        return details;
    }
}
