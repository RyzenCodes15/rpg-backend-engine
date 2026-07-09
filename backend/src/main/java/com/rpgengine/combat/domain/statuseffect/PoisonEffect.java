package com.rpgengine.combat.domain.statuseffect;

import com.rpgengine.combat.domain.engine.CombatEvent;

public class PoisonEffect extends BaseStatusEffect {
    private final int damagePerTurn;
    private final String targetName;

    public PoisonEffect(int duration, int damagePerTurn, String targetName) {
        super(duration);
        this.damagePerTurn = damagePerTurn;
        this.targetName = targetName;
    }

    @Override
    public String getName() {
        return "Poison";
    }

    @Override
    public EffectResult apply(int targetHealth) {
        int newHealth = Math.max(0, targetHealth - damagePerTurn);
        CombatEvent event = new CombatEvent(
                targetName,
                "Poison Damage",
                damagePerTurn,
                targetName + " suffers " + damagePerTurn + " poison damage."
        );
        return new EffectResult(newHealth, event, true);
    }
}
