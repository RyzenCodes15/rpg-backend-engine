package com.rpgengine.combat.domain.statuseffect;

import com.rpgengine.combat.domain.engine.CombatEvent;

public abstract class BaseStatusEffect implements StatusEffect {
    protected int duration;

    public BaseStatusEffect(int duration) {
        this.duration = duration;
    }

    @Override
    public int getRemainingDuration() {
        return duration;
    }

    @Override
    public void decrementDuration() {
        if (duration > 0) {
            duration--;
        }
    }

    @Override
    public boolean isExpired() {
        return duration <= 0;
    }
}
