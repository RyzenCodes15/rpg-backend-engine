package com.rpgengine.inventory.infrastructure.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.UUID;

@Entity
@Table(name = "character_equipment")
public class EquipmentJpaEntity {

    @Id
    private UUID id;

    @Column(name = "character_id", nullable = false, unique = true)
    private UUID characterId;

    @ManyToOne
    @JoinColumn(name = "weapon_item_id")
    private ItemJpaEntity weapon;

    @ManyToOne
    @JoinColumn(name = "helmet_item_id")
    private ItemJpaEntity helmet;

    @ManyToOne
    @JoinColumn(name = "chest_item_id")
    private ItemJpaEntity chestArmor;

    @ManyToOne
    @JoinColumn(name = "gloves_item_id")
    private ItemJpaEntity gloves;

    @ManyToOne
    @JoinColumn(name = "boots_item_id")
    private ItemJpaEntity boots;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getCharacterId() { return characterId; }
    public void setCharacterId(UUID characterId) { this.characterId = characterId; }
    public ItemJpaEntity getWeapon() { return weapon; }
    public void setWeapon(ItemJpaEntity weapon) { this.weapon = weapon; }
    public ItemJpaEntity getHelmet() { return helmet; }
    public void setHelmet(ItemJpaEntity helmet) { this.helmet = helmet; }
    public ItemJpaEntity getChestArmor() { return chestArmor; }
    public void setChestArmor(ItemJpaEntity chestArmor) { this.chestArmor = chestArmor; }
    public ItemJpaEntity getGloves() { return gloves; }
    public void setGloves(ItemJpaEntity gloves) { this.gloves = gloves; }
    public ItemJpaEntity getBoots() { return boots; }
    public void setBoots(ItemJpaEntity boots) { this.boots = boots; }
}
