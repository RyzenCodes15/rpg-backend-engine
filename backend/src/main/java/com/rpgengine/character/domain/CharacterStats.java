package com.rpgengine.character.domain;

import java.math.BigDecimal;
import java.math.RoundingMode;

public record CharacterStats(
        int health,
        int mana,
        int attack,
        int defense,
        int speed,
        BigDecimal criticalChance
) {
    public CharacterStats add(CharacterStats other) {
        return new CharacterStats(
                this.health + other.health(),
                this.mana + other.mana(),
                this.attack + other.attack(),
                this.defense + other.defense(),
                this.speed + other.speed(),
                this.criticalChance.add(other.criticalChance())
        );
    }
}
