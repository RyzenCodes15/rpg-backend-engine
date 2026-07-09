package com.rpgengine.combat.domain.repository;

import com.rpgengine.combat.domain.Monster;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MonsterRepository {
    List<Monster> findAll();
    Optional<Monster> findById(UUID id);
}
