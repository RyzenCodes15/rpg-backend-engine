package com.rpgengine.character.domain.repository;

import com.rpgengine.character.domain.Character;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CharacterRepository {
    Character save(Character character);
    Optional<Character> findById(UUID id);
    List<Character> findByUserId(UUID userId);
    void deleteById(UUID id);
}
