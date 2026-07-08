package com.rpgengine.character.domain;

import java.math.BigDecimal;

public class MageStatGrowth implements StatGrowthStrategy {
    @Override
    public CharacterStats getBaseStats() {
        return new CharacterStats(80, 100, 5, 5, 8, new BigDecimal("10.00"));
    }

    @Override
    public CharacterStats getGrowthPerLevel() {
        return new CharacterStats(10, 15, 1, 1, 2, new BigDecimal("1.00"));
    }
}
