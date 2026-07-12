package com.rpgengine.character.presentation;

import com.rpgengine.character.application.CampService;
import com.rpgengine.character.domain.Character;
import com.rpgengine.common.presentation.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/camp")
public class CampController {

    private final CampService campService;

    public CampController(CampService campService) {
        this.campService = campService;
    }

    @PostMapping("/rest/{characterId}")
    public ResponseEntity<ApiResponse<Character>> restAtCamp(@PathVariable UUID characterId) {
        Character character = campService.restAtCamp(characterId);
        return ResponseEntity.ok(ApiResponse.success(character));
    }
}
