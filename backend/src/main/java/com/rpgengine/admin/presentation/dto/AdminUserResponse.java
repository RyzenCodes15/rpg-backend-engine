package com.rpgengine.admin.presentation.dto;

import com.rpgengine.auth.domain.User;

import java.util.UUID;

public record AdminUserResponse(
    UUID id,
    String username,
    String email,
    String role,
    boolean enabled
) {
    public static AdminUserResponse fromDomain(User user) {
        return new AdminUserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.isEnabled()
        );
    }
}
