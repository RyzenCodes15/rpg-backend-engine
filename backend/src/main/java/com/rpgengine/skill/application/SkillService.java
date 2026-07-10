package com.rpgengine.skill.application;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.repository.CharacterRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.skill.domain.CharacterSkill;
import com.rpgengine.skill.domain.Skill;
import com.rpgengine.skill.domain.repository.CharacterSkillRepository;
import com.rpgengine.skill.domain.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class SkillService {

    private final SkillRepository skillRepository;
    private final CharacterSkillRepository characterSkillRepository;
    private final CharacterRepository characterRepository;

    public SkillService(SkillRepository skillRepository, CharacterSkillRepository characterSkillRepository, CharacterRepository characterRepository) {
        this.skillRepository = skillRepository;
        this.characterSkillRepository = characterSkillRepository;
        this.characterRepository = characterRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> getCharacterSkills(UUID characterId) {
        List<CharacterSkill> charSkills = characterSkillRepository.findByCharacterId(characterId);
        return charSkills.stream()
                .map(cs -> skillRepository.findById(cs.getSkillId()).orElseThrow())
                .collect(Collectors.toList());
    }

    public void checkAndUnlockSkills(UUID characterId) {
        Character character = characterRepository.findById(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Character not found"));

        List<Skill> classSkills = skillRepository.findByClassRestriction(character.getCharacterClass());
        List<CharacterSkill> existingSkills = characterSkillRepository.findByCharacterId(characterId);
        
        List<UUID> existingSkillIds = existingSkills.stream()
                .map(CharacterSkill::getSkillId)
                .collect(Collectors.toList());

        for (Skill skill : classSkills) {
            if (character.getLevel() >= skill.getRequiredLevel() && !existingSkillIds.contains(skill.getId())) {
                CharacterSkill newSkill = new CharacterSkill(
                        UUID.randomUUID(),
                        characterId,
                        skill.getId(),
                        LocalDateTime.now()
                );
                characterSkillRepository.save(newSkill);
            }
        }
    }
}
