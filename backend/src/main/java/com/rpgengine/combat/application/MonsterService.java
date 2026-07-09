package com.rpgengine.combat.application;

import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.repository.MonsterRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MonsterService {

    private final MonsterRepository monsterRepository;

    public MonsterService(MonsterRepository monsterRepository) {
        this.monsterRepository = monsterRepository;
    }

    public List<Monster> getAllMonsters() {
        return monsterRepository.findAll();
    }

    public Monster getMonsterById(UUID id) {
        return monsterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Monster not found with id: " + id));
    }
}
