package com.rpgengine.combat.presentation.dto;

import java.util.UUID;

public record MonsterResponse(
        UUID id,
        String name,
        String description,
        int level,
        int health,
        int attack,
        int defense,
        int speed,
        long goldReward,
        long experienceReward
) {}
