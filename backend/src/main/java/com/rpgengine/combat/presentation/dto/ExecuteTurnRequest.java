package com.rpgengine.combat.presentation.dto;

import java.util.UUID;

public record ExecuteTurnRequest(
        UUID skillId
) {}
