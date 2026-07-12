package com.rpgengine.admin.presentation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdateUserRoleRequest(
    @NotBlank(message = "Role cannot be blank")
    @Pattern(regexp = "^(ROLE_PLAYER|ROLE_ADMIN)$", message = "Invalid role")
    String role
) {}
