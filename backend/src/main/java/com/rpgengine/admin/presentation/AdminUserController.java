package com.rpgengine.admin.presentation;

import com.rpgengine.admin.application.AdminUserService;
import com.rpgengine.admin.presentation.dto.AdminUserResponse;
import com.rpgengine.admin.presentation.dto.UpdateUserRoleRequest;
import com.rpgengine.admin.presentation.dto.UpdateUserStatusRequest;
import com.rpgengine.auth.domain.User;
import com.rpgengine.common.presentation.dto.ApiResponse;
import com.rpgengine.common.presentation.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/users")
@Tag(name = "Admin Users", description = "Admin endpoints for user management")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    @Operation(summary = "Get Users", description = "Retrieves a paginated list of users with optional search")
    public ResponseEntity<ApiResponse<PageResponse<AdminUserResponse>>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<User> usersPage = adminUserService.getUsers(search, page, size);
        List<AdminUserResponse> content = usersPage.getContent().stream()
                .map(AdminUserResponse::fromDomain)
                .collect(Collectors.toList());
        
        PageResponse<AdminUserResponse> response = new PageResponse<>(
                content,
                usersPage.getPageNumber(),
                usersPage.getPageSize(),
                usersPage.getTotalElements(),
                usersPage.getTotalPages(),
                usersPage.isLast()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{userId}/status")
    @Operation(summary = "Update User Status", description = "Enable or disable a user account")
    public ResponseEntity<ApiResponse<Void>> updateUserStatus(
            @PathVariable UUID userId,
            @Valid @RequestBody UpdateUserStatusRequest request) {
        
        adminUserService.updateUserStatus(userId, request.enabled());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PutMapping("/{userId}/role")
    @Operation(summary = "Update User Role", description = "Change the role of a user")
    public ResponseEntity<ApiResponse<Void>> updateUserRole(
            @PathVariable UUID userId,
            @Valid @RequestBody UpdateUserRoleRequest request) {
        
        adminUserService.updateUserRole(userId, request.role());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
