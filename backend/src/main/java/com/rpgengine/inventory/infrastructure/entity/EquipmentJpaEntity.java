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
    @ManyToOne
    @JoinColumn(name = "shield_item_id")
    private ItemJpaEntity shield;

    @ManyToOne
    @JoinColumn(name = "ring_item_id")
    private ItemJpaEntity ring;

    @ManyToOne
    @JoinColumn(name = "amulet_item_id")
    private ItemJpaEntity amulet;

    @ManyToOne
    @JoinColumn(name = "cape_item_id")
    private ItemJpaEntity cape;

    @ManyToOne
    @JoinColumn(name = "leg_armor_item_id")
    private ItemJpaEntity legArmor;

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
    public ItemJpaEntity getShield() { return shield; }
    public void setShield(ItemJpaEntity shield) { this.shield = shield; }
    public ItemJpaEntity getRing() { return ring; }
    public void setRing(ItemJpaEntity ring) { this.ring = ring; }
    public ItemJpaEntity getAmulet() { return amulet; }
    public void setAmulet(ItemJpaEntity amulet) { this.amulet = amulet; }
    public ItemJpaEntity getCape() { return cape; }
    public void setCape(ItemJpaEntity cape) { this.cape = cape; }
    public ItemJpaEntity getLegArmor() { return legArmor; }
    public void setLegArmor(ItemJpaEntity legArmor) { this.legArmor = legArmor; }
}
