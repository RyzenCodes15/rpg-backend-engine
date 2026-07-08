package com.rpgengine.character.domain;

public interface StatGrowthStrategy {
    CharacterStats getBaseStats();
    CharacterStats getGrowthPerLevel();
}
