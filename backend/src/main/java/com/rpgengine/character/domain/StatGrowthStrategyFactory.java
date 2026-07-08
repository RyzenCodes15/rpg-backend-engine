package com.rpgengine.character.domain;

public class StatGrowthStrategyFactory {
    public static StatGrowthStrategy getStrategy(CharacterClass characterClass) {
        return switch (characterClass) {
            case WARRIOR -> new WarriorStatGrowth();
            case MAGE -> new MageStatGrowth();
            case ARCHER -> new ArcherStatGrowth();
        };
    }
}
