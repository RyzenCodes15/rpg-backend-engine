package com.rpgengine.inventory.domain;

import java.util.UUID;

public class Equipment {
    private UUID id;
    private UUID characterId;
    private Item weapon;
    private Item helmet;
    private Item chestArmor;
    private Item gloves;
    private Item boots;

    public Equipment() {}

    public Equipment(UUID id, UUID characterId, Item weapon, Item helmet, Item chestArmor, Item gloves, Item boots) {
        this.id = id;
        this.characterId = characterId;
        this.weapon = weapon;
        this.helmet = helmet;
        this.chestArmor = chestArmor;
        this.gloves = gloves;
        this.boots = boots;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getCharacterId() { return characterId; }
    public void setCharacterId(UUID characterId) { this.characterId = characterId; }
    public Item getWeapon() { return weapon; }
    public void setWeapon(Item weapon) { this.weapon = weapon; }
    public Item getHelmet() { return helmet; }
    public void setHelmet(Item helmet) { this.helmet = helmet; }
    public Item getChestArmor() { return chestArmor; }
    public void setChestArmor(Item chestArmor) { this.chestArmor = chestArmor; }
    public Item getGloves() { return gloves; }
    public void setGloves(Item gloves) { this.gloves = gloves; }
    public Item getBoots() { return boots; }
    public void setBoots(Item boots) { this.boots = boots; }
}
