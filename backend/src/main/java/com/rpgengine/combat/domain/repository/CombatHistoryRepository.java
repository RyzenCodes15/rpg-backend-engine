package com.rpgengine.combat.domain.repository;

import com.rpgengine.combat.domain.CombatHistory;
import java.util.List;
import java.util.UUID;

public interface CombatHistoryRepository {
    CombatHistory save(CombatHistory history);
    List<CombatHistory> findByCharacterId(UUID characterId);
}
