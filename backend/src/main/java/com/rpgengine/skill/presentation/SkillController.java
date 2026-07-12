package com.rpgengine.skill.presentation;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.repository.CharacterRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.skill.application.SkillService;
import com.rpgengine.skill.domain.Skill;
import com.rpgengine.skill.presentation.dto.SkillResponse;
import com.rpgengine.common.presentation.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/skills")
@Tag(name = "Skills", description = "Endpoints for managing character skills")
public class SkillController {

    private final SkillService skillService;
    private final CharacterRepository characterRepository;

    public SkillController(SkillService skillService, CharacterRepository characterRepository) {
        this.skillService = skillService;
        this.characterRepository = characterRepository;
    }

    @GetMapping("/{characterId}")
    @Operation(summary = "Get Character Skills", description = "Retrieves all available skills for a character, marking which ones are unlocked.")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getCharacterSkills(@PathVariable UUID characterId) {
        Character character = characterRepository.findById(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Character not found"));

        // Auto-unlock any skills they now meet requirements for
        skillService.checkAndUnlockSkills(characterId);

        List<Skill> unlockedSkills = skillService.getCharacterSkills(characterId);
        List<UUID> unlockedIds = unlockedSkills.stream().map(Skill::getId).collect(Collectors.toList());

        List<Skill> allClassSkills = skillService.getAllSkills().stream()
                .filter(s -> s.getClassRestriction() == character.getCharacterClass())
                .collect(Collectors.toList());

        List<SkillResponse> response = allClassSkills.stream()
                .map(s -> new SkillResponse(
                        s.getId(),
                        s.getName(),
                        s.getDescription(),
                        s.getClassRestriction(),
                        s.getRequiredLevel(),
                        s.getManaCost(),
                        s.getCooldown(),
                        s.getBaseDamage(),
                        s.getSkillType(),
                        s.getElement(),
                        s.getIcon(),
                        s.getAnimationName(),
                        s.getStatusEffectType(),
                        unlockedIds.contains(s.getId())
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
