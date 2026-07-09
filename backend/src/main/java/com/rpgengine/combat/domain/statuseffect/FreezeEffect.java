package com.rpgengine.combat.domain.statuseffect;

import com.rpgengine.combat.domain.engine.CombatEvent;

public class FreezeEffect extends BaseStatusEffect {
    private final String targetName;

    public FreezeEffect(int duration, String targetName) {
        super(duration);
        this.targetName = targetName;
    }

    @Override
    public String getName() {
        return "Freeze";
    }

    @Override
    public EffectResult apply(int targetHealth) {
        CombatEvent event = new CombatEvent(
                targetName,
                "Frozen",
                0,
                targetName + " is frozen solid and cannot act!"
        );
        return new EffectResult(targetHealth, event, false);
    }
}
