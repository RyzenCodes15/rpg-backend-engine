package com.rpgengine.combat.domain.engine;

import java.util.ArrayList;
import java.util.List;

public class CombatLog {
    private final List<CombatEvent> events = new ArrayList<>();

    public void addEvent(CombatEvent event) {
        if (event != null) {
            events.add(event);
        }
    }

    public List<CombatEvent> getEvents() {
        return List.copyOf(events);
    }
}
