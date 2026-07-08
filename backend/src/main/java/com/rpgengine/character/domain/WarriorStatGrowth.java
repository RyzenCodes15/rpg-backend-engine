package com.rpgengine.character.domain;

import java.math.BigDecimal;

public class WarriorStatGrowth implements StatGrowthStrategy {
    @Override
    public CharacterStats getBaseStats() {
        return new CharacterStats(150, 20, 15, 12, 5, new BigDecimal("5.00"));
    }

    @Override
    public CharacterStats getGrowthPerLevel() {
        return new CharacterStats(25, 2, 4, 3, 1, new BigDecimal("0.50"));
    }
}
