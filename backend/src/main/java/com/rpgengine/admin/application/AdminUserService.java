package com.rpgengine.admin.application;

import com.rpgengine.auth.domain.Role;
import com.rpgengine.auth.domain.User;
import com.rpgengine.auth.domain.UserRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.common.presentation.dto.PageResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class AdminUserService {

    private final UserRepository userRepository;

    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<User> getUsers(String search, int page, int size) {
        return userRepository.findUsers(search, page, size);
    }

    public void updateUserStatus(UUID userId, boolean enabled) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(enabled);
        userRepository.save(user);
    }

    public void updateUserRole(UUID userId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRole(Role.valueOf(role.toUpperCase()));
        userRepository.save(user);
    }
}
