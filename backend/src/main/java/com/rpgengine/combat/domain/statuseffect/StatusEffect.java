package com.rpgengine.combat.domain.statuseffect;

import com.rpgengine.combat.domain.engine.CombatEvent;

public interface StatusEffect {
    String getName();
    int getRemainingDuration();
    void decrementDuration();
    boolean isExpired();
    
    /**
     * Applies the effect to the target at the start of their turn.
     * @param targetHealth current health
     * @return an event describing what happened, and the new health.
     */
    EffectResult apply(int targetHealth);
    
    public record EffectResult(int newHealth, CombatEvent event, boolean canAct) {}
}
