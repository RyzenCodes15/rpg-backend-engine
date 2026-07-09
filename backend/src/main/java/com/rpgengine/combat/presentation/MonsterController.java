package com.rpgengine.combat.presentation;

import com.rpgengine.combat.application.MonsterService;
import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.presentation.dto.MonsterResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/monsters")
@Tag(name = "Monsters", description = "Endpoints for retrieving monster data")
public class MonsterController {

    private final MonsterService monsterService;

    public MonsterController(MonsterService monsterService) {
        this.monsterService = monsterService;
    }

    @GetMapping
    @Operation(summary = "Get all monsters", description = "Retrieves a list of all available monsters in the game.")
    public ResponseEntity<List<MonsterResponse>> getAllMonsters() {
        List<MonsterResponse> responses = monsterService.getAllMonsters().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a monster by ID", description = "Retrieves a single monster's details by its ID.")
    public ResponseEntity<MonsterResponse> getMonsterById(@PathVariable UUID id) {
        Monster monster = monsterService.getMonsterById(id);
        return ResponseEntity.ok(mapToResponse(monster));
    }

    private MonsterResponse mapToResponse(Monster monster) {
        return new MonsterResponse(
                monster.getId(),
                monster.getName(),
                monster.getDescription(),
                monster.getLevel(),
                monster.getHealth(),
                monster.getAttack(),
                monster.getDefense(),
                monster.getSpeed(),
                monster.getGoldReward(),
                monster.getExperienceReward()
        );
    }
}
