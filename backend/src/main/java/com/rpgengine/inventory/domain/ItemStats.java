package com.rpgengine.inventory.domain;

import java.math.BigDecimal;

public record ItemStats(
        int bonusHealth,
        int bonusMana,
        int bonusAttack,
        int bonusDefense,
        int bonusSpeed,
        BigDecimal bonusCriticalChance,
        BigDecimal bonusDodgeChance
) {
}
