package com.rpgengine.combat.domain.statuseffect;

import com.rpgengine.combat.domain.engine.CombatEvent;

public class StunEffect extends BaseStatusEffect {
    private final String targetName;

    public StunEffect(int duration, String targetName) {
        super(duration);
        this.targetName = targetName;
    }

    @Override
    public String getName() {
        return "Stun";
    }

    @Override
    public EffectResult apply(int targetHealth) {
        CombatEvent event = new CombatEvent(
                targetName,
                "Stunned",
                0,
                targetName + " is stunned and cannot act!"
        );
        return new EffectResult(targetHealth, event, false);
    }
}
