# Getting Started with Kiro - DarkStory Configuration

This guide will help you understand and use the Kiro configuration in the DarkStory project.

## .kiro/ Structure

```
.kiro/
├── README.md                          # Overview
├── GETTING_STARTED.md                 # This guide
├── steering/                          # Rules and context
│   ├── project-context.md            # Always included context
│   ├── ai-integration.md             # Guidelines for AI files
│   └── steering-documentation.md     # Steering documentation
├── hooks/                             # Automations
│   └── hooks-documentation.md        # Hooks documentation
├── specs/                             # Spec-driven development
│   └── spec-driven-development.md    # Specs documentation
├── conversations/                     # Conversation documentation
│   ├── vibe-coding.md                # Vibe coding experience
│   └── project-summary.md            # Project summary
├── mcp/                               # Model Context Protocol
│   └── mcp-documentation.md          # MCP documentation
└── settings/                          # Configurations
    └── mcp.json                       # MCP servers configuration
```

## Quick Start

### 1. Steering Files (Automatic Context)

Steering files provide context to Kiro automatically.

**Already configured**:
- `project-context.md`: Always included
- `ai-integration.md`: Included when editing `**/generate.*` files

**How it works**:
```
You: "Create a button component"

Kiro: [Reads project-context.md automatically]
      [Knows you use Next.js, TypeScript, Tailwind]
      [Generates component following your conventions]
```

**You don't need to do anything**, Kiro reads these files automatically.

### 2. MCP Servers (External Tools)

MCP extends Kiro's capabilities with external tools.

**Configured in `.kiro/settings/mcp.json`**:
- `aws-docs`: Active - Searches AWS documentation
- `vercel`: Inactive - Deployment management
- `github`: Inactive - Issues/PRs management

**To activate an MCP server**:
1. Open `.kiro/settings/mcp.json`
2. Change `"disabled": true` to `"disabled": false`
3. Save the file
4. Kiro will reconnect automatically

**Usage example**:
```
You: "I have a 502 error in Elastic Beanstalk"

Kiro: [Uses MCP aws-docs to search]
      "According to AWS docs, 502 error can be..."
```

### 3. Vibe Coding (Conversational Development)

Simply talk to Kiro naturally.

**Examples**:
```
✅ "Create a component to display images"
✅ "Add error handling to the backend"
✅ "Optimize image generation performance"
✅ "Document the API"
```

Kiro will use the steering context automatically.

### 4. Spec-Driven Development (Optional)

For complex features, you can create structured specs.

**When to use**:
- Features that take > 2 hours
- Integrations with external APIs
- Systems with multiple components

**How to create a spec**:
```
You: "Create a spec for authentication system"

Kiro: [Generates requirements.md, design.md, tasks.md]

You: "Implement Task 1"

Kiro: [Implements according to spec]
```

### 5. Agent Hooks (Automation)

Hooks automate tasks when events occur.

**Useful hook examples**:
- Validate TypeScript types on save
- Update documentation when modifying API
- Verify environment variables before deploy

**To create a hook**:
1. Open Command Palette (Ctrl+Shift+P)
2. Search for "Open Kiro Hook UI"
3. Configure your hook

## Daily Usage

### Normal Development

1. **Open a file** (e.g., `components/Button.tsx`)
2. **Talk to Kiro**: "Improve this component"
3. **Kiro automatically**:
   - Reads `project-context.md`
   - Knows your stack and conventions
   - Generates consistent code

### Working with Gemini API and ElevenLabs

1. **Open generation file** (e.g., `backend-vercel/api/index.py`)
2. **Kiro automatically**:
   - Reads `project-context.md`
   - Reads `ai-integration.md` (by file pattern)
   - Has expertise in Gemini API and ElevenLabs API

### Troubleshooting with AWS

1. **Mention the problem**: "502 error in Elastic Beanstalk"
2. **Kiro automatically**:
   - Uses MCP aws-docs to search
   - Provides solution based on official docs

## Customization

### Add New Steering File

1. Create file in `.kiro/steering/`
2. Add front-matter:
```yaml
---
inclusion: always  # or fileMatch, or manual
---
```
3. Write your context/rules
4. Save - Kiro will use it automatically

### Add New MCP Server

1. Edit `.kiro/settings/mcp.json`
2. Add configuration:
```json
{
  "mcpServers": {
    "your-server": {
      "command": "uvx",
      "args": ["your-mcp-server"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```
3. Save - Kiro will connect automatically

### Create Custom Hook

1. Command Palette → "Open Kiro Hook UI"
2. Configure:
   - Trigger: on-save, on-message, manual
   - File pattern: `**/*.tsx`
   - Action: send-message or shell-command
3. Save - Hook activates automatically

## Tips and Best Practices

### Steering
- ✅ Keep steering files concise
- ✅ Update when conventions change
- ✅ Use file patterns for specific context
- ❌ Don't include unnecessary information

### MCP
- ✅ Start with 1-2 servers
- ✅ Auto-approve safe operations (read-only)
- ✅ Manual approval for write operations
- ❌ Don't activate all servers at once

### Vibe Coding
- ✅ Be specific but natural
- ✅ Trust the steering context
- ✅ Iterate quickly
- ❌ Don't over-explain the context

### Spec-Driven
- ✅ Use for complex features
- ✅ Keep specs simple
- ✅ Iterate on the spec
- ❌ Don't use for simple features

## Troubleshooting

### Kiro doesn't follow my conventions
- Verify that `project-context.md` is updated
- Ensure `inclusion: always` is in front-matter

### MCP server doesn't work
- Verify that `disabled: false`
- Check that `uvx` is installed
- Review logs in MCP Server view

### Hook doesn't activate
- Verify the file pattern
- Check the trigger type
- Review configuration in Agent Hooks view

## Resources

### Complete Documentation
- **Steering**: `.kiro/steering/steering-documentation.md`
- **MCP**: `.kiro/mcp/mcp-documentation.md`
- **Hooks**: `.kiro/hooks/hooks-documentation.md`
- **Specs**: `.kiro/specs/spec-driven-development.md`
- **Vibe Coding**: `.kiro/conversations/vibe-coding.md`

### Examples
- **Project Summary**: `.kiro/conversations/project-summary.md`
- **MCP Config**: `.kiro/settings/mcp.json`
- **Steering Files**: `.kiro/steering/*.md`

## Next Steps

1. **Read** `project-summary.md` to understand how Kiro was used
2. **Explore** the steering files to see the configured context
3. **Try** vibe coding with Kiro
4. **Experiment** with MCP servers
5. **Create** hooks to automate your workflow

## Frequently Asked Questions

**Q: Do I need to configure anything to start?**
A: No, steering is already configured. Just talk to Kiro.

**Q: When should I use specs vs vibe coding?**
A: Vibe coding for most things. Specs for complex features (> 2 hours).

**Q: How do I know if MCP is working?**
A: Kiro will mention when it uses MCP tools in its responses.

**Q: Can I modify the steering files?**
A: Yes, they're yours. Update them as your project evolves.

**Q: Do I need to install anything for MCP?**
A: Yes, you need `uv` and `uvx`. See MCP documentation.

---

**Ready to start!** Simply talk to Kiro and let the steering context do its magic. 🚀
