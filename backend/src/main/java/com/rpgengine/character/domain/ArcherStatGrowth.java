package com.rpgengine.character.domain;

import java.math.BigDecimal;

public class ArcherStatGrowth implements StatGrowthStrategy {
    @Override
    public CharacterStats getBaseStats() {
        return new CharacterStats(100, 40, 10, 8, 15, new BigDecimal("15.00"), new BigDecimal("10.00"));
    }

    @Override
    public CharacterStats getGrowthPerLevel() {
        return new CharacterStats(15, 5, 3, 2, 4, new BigDecimal("2.00"), new BigDecimal("1.50"));
    }
}
