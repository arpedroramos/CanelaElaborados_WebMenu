---
name: Skill Creator
description: A meta-skill that instructs the agent on how to create, format, and scaffold new skills.
---

# Skill Creator

This skill provides the standard guidelines for creating new skills within this workspace. 

## When to use this skill
Use this skill whenever the user asks you to create a new skill or automate a recurring set of prompts/instructions into a reusable format.

## Guidelines for Creating a Skill

1. **Location and Naming (ISO/IEC 646)**: 
   - Workspace-specific skills should be placed in `.agents/skills/<skill-name>/SKILL.md` relative to the workspace root.
   - Global skills should be placed in `~/.gemini/config/skills/<skill-name>/SKILL.md`.
   - **CRITICAL**: The `<skill-name>` folder MUST follow ISO/IEC 646 conventions: use only lowercase letters, numbers, and hyphens (`[a-z0-9-]`). Do not use spaces, uppercase letters, special characters, or accents.

2. **File Format**:
   - The file must be named `SKILL.md`.
   - It MUST contain YAML frontmatter at the very top of the file, specifying the `name` and `description` of the skill.

3. **YAML Frontmatter Structure**:
   ```yaml
   ---
   name: [Human-readable Name of the Skill]
   description: [A short, actionable description of what the skill does and when to use it]
   ---
   ```

4. **Skill Content**:
   - Write the main body of the skill in Markdown.
   - Use clear sections to outline "When to use", "Instructions", "Best Practices", and "Examples".
   - Keep the instructions concise but explicit.
   - You can include templates, standard operating procedures, and specific coding guidelines within the skill file.

5. **Best Practices**:
   - **Focus**: Each skill should focus on one specific task, tool, or workflow.
   - **Clarity**: Write clear, direct instructions as if giving them to another instance of yourself.
   - **Validation**: After creating a skill, verify it has the correct YAML frontmatter and file path.

## Execution Steps

When a user asks you to create a new skill, follow these steps:
1. Ask the user for a name and a description of the skill if not provided.
2. Determine if it should be workspace-level or global (ask the user if unsure).
3. Use your `write_to_file` tool to create the `SKILL.md` file in the appropriate directory with the YAML frontmatter.
4. Inform the user that the skill has been created successfully.

## Documentación de Referencia

Cuando el contexto de la tarea lo requiera, asegúrate de consultar los siguientes manuales en el directorio `docs/`:
- `02_Manual_Tecnico/13_Sistema_de_Agentes.md`: Para guiarte sobre cómo documentar adecuadamente el nuevo skill que acabas de crear.
- `00_Indice_General.md`: Para buscar otros manuales relevantes que el nuevo skill podría necesitar referenciar.
