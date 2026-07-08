package com.rpgengine.inventory.domain;

import java.util.UUID;

public class Item {
    private UUID id;
    private String name;
    private String description;
    private ItemRarity rarity;
    private ItemCategory category;
    private long value;
    private int requiredLevel;
    private ItemStats stats;

    public Item() {}

    public Item(UUID id, String name, String description, ItemRarity rarity, ItemCategory category, long value, int requiredLevel, ItemStats stats) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rarity = rarity;
        this.category = category;
        this.value = value;
        this.requiredLevel = requiredLevel;
        this.stats = stats;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ItemRarity getRarity() { return rarity; }
    public void setRarity(ItemRarity rarity) { this.rarity = rarity; }
    public ItemCategory getCategory() { return category; }
    public void setCategory(ItemCategory category) { this.category = category; }
    public long getValue() { return value; }
    public void setValue(long value) { this.value = value; }
    public int getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(int requiredLevel) { this.requiredLevel = requiredLevel; }
    public ItemStats getStats() { return stats; }
    public void setStats(ItemStats stats) { this.stats = stats; }
}
