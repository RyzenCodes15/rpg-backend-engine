package com.rpgengine.admin.presentation.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateUserStatusRequest(
    @NotNull(message = "Status cannot be null")
    Boolean enabled
) {}
