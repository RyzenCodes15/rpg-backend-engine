package com.rpgengine.auth.domain;

import com.rpgengine.common.presentation.dto.PageResponse;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(UUID id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    PageResponse<User> findUsers(String search, int page, int size);
}
