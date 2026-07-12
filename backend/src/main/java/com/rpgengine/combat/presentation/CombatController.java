package com.rpgengine.combat.presentation;

import com.rpgengine.combat.application.CombatService;
import com.rpgengine.combat.domain.engine.CombatSession;
import com.rpgengine.combat.presentation.dto.CombatHistoryResponse;
import com.rpgengine.combat.presentation.dto.CombatResponse;
import com.rpgengine.combat.presentation.dto.CombatSessionResponse;
import com.rpgengine.combat.presentation.dto.ExecuteTurnRequest;
import com.rpgengine.common.presentation.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/combat")
@Tag(name = "Combat", description = "Endpoints for interactive turn-based combat")
public class CombatController {

    private final CombatService combatService;

    public CombatController(CombatService combatService) {
        this.combatService = combatService;
    }

    @PostMapping("/{characterId}/start/{monsterId}")
    @Operation(summary = "Start Combat", description = "Starts a new interactive combat session.")
    public ResponseEntity<ApiResponse<CombatSessionResponse>> startCombat(
            @PathVariable UUID characterId,
            @PathVariable UUID monsterId) {
        CombatSession session = combatService.startCombat(characterId, monsterId);
        CombatSessionResponse response = new CombatSessionResponse(
                session.getId(),
                session.getCharacterId(),
                session.getMonsterId(),
                session.isActive(),
                session.getCharacterHp(),
                session.getCharacterMana(),
                session.getMonsterHp(),
                session.getCooldowns()
        );
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/{characterId}/turn")
    @Operation(summary = "Execute Turn", description = "Executes a single combat turn using a basic attack or skill.")
    public ResponseEntity<ApiResponse<CombatResponse>> executeTurn(
            @PathVariable UUID characterId,
            @RequestBody(required = false) ExecuteTurnRequest request) {
        UUID skillId = request != null ? request.skillId() : null;
        CombatResponse response = combatService.executeTurn(characterId, skillId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{characterId}/session")
    @Operation(summary = "Get Active Session", description = "Retrieves the current active combat session.")
    public ResponseEntity<ApiResponse<CombatSessionResponse>> getActiveSession(@PathVariable UUID characterId) {
        CombatSession session = combatService.getActiveSession(characterId);
        CombatSessionResponse response = new CombatSessionResponse(
                session.getId(),
                session.getCharacterId(),
                session.getMonsterId(),
                session.isActive(),
                session.getCharacterHp(),
                session.getCharacterMana(),
                session.getMonsterHp(),
                session.getCooldowns()
        );
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{characterId}/history")
    @Operation(summary = "Get Combat History", description = "Retrieves the combat history for a specific character.")
    public ResponseEntity<ApiResponse<List<CombatHistoryResponse>>> getHistory(@PathVariable UUID characterId) {
        List<CombatHistoryResponse> history = combatService.getCharacterHistory(characterId).stream()
                .map(h -> new CombatHistoryResponse(
                        h.getId(),
                        h.getMonsterId(),
                        h.isVictory(),
                        h.getDamageDealt(),
                        h.getDamageTaken(),
                        h.getGoldEarned(),
                        h.getExperienceEarned(),
                        h.getTimestamp()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(history));
    }
}
