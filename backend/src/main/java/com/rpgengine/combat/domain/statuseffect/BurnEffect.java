package com.rpgengine.combat.domain.statuseffect;

import com.rpgengine.combat.domain.engine.CombatEvent;

public class BurnEffect extends BaseStatusEffect {
    private final int damagePerTurn;
    private final String targetName;

    public BurnEffect(int duration, int damagePerTurn, String targetName) {
        super(duration);
        this.damagePerTurn = damagePerTurn;
        this.targetName = targetName;
    }

    @Override
    public String getName() {
        return "Burn";
    }

    @Override
    public EffectResult apply(int targetHealth) {
        int newHealth = Math.max(0, targetHealth - damagePerTurn);
        CombatEvent event = new CombatEvent(
                targetName,
                "Burn Damage",
                damagePerTurn,
                targetName + " is burned for " + damagePerTurn + " damage."
        );
        return new EffectResult(newHealth, event, true);
    }
}
