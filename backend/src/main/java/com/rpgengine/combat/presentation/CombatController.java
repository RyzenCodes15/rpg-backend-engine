package com.rpgengine.combat.presentation;

import com.rpgengine.combat.application.CombatService;
import com.rpgengine.combat.presentation.dto.CombatHistoryResponse;
import com.rpgengine.combat.presentation.dto.CombatResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/combat")
@Tag(name = "Combat", description = "Endpoints for initiating combat and retrieving history")
public class CombatController {

    private final CombatService combatService;

    public CombatController(CombatService combatService) {
        this.combatService = combatService;
    }

    @PostMapping("/{characterId}/fight/{monsterId}")
    @Operation(summary = "Initiate Combat", description = "Executes combat between a character and a monster and returns the full combat log and results.")
    public ResponseEntity<CombatResponse> fight(
            @PathVariable UUID characterId,
            @PathVariable UUID monsterId) {
        CombatResponse response = combatService.fight(characterId, monsterId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{characterId}/history")
    @Operation(summary = "Get Combat History", description = "Retrieves the combat history for a specific character.")
    public ResponseEntity<List<CombatHistoryResponse>> getHistory(@PathVariable UUID characterId) {
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
        return ResponseEntity.ok(history);
    }
}
