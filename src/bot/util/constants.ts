const en = {
  dialog: {
    'BAN_AUDIT_REASON': 'Banned by {{TAG}}{{REASON}}',
    'BAN_CANCELLED': 'Banning cancelled.',
    'BAN_CONFIRM': 'User {{MEMBER}} was banned from the server{{REASON}}',
    'BAN_DM_MESSAGE': 'You were banned from the server `{{GUILD}}`{{REASON}}',
    'BAN_TIMEOUT': 'Timed out. User was not banned.',
    'CONFIRM_BAN': 'Are you sure you want to ban {{MEMBER}}? respond with `cancel` to cancel ban.',
  },
  errors: {
    command: {
      'NO_TARGET': 'You have passed invalid target - No one was mentioned or ID is incorrect.',
      'NOT_BANNABLE': 'You cannot ban this user.',
      'NOT_BANNABLE_ME': 'I cannot ban this user.',
      'NOT_BANNABLE_OWNER': 'Guild owner cannot be banned',
      'NOT_BANNABLE_SELF': 'You cannot ban yourself.',
    },
    eventHandler: {
      'ARGS_REQUIRED': 'This command requires args, but you did not pass any.',
      'COMMAND_DISABLED': 'Sorry, but this command is currently disabled.',
      'COMMAND_DISABLED_GUILD': 'Sorry, but this command was disabled for this guild.',
      'COMMAND_NOT_ENABLED': 'Sorry, but this command is enabled only in specific guilds.',
      'COMMAND_NOT_ENABLED_GUILD': 'Sorry, but this command is currently disabled globally, and is not enabled for this guild.',
      'GUILD_ONLY': 'This command is for use only in a guild.',
      'NO_PERMS': 'You are missing permissions to use this command:',
      'OWNER_ONLY': 'This command is for use only by bot owners.',
      'USER_BLACKLISTED': 'you have been blacklisted from using this bot.\nIf you think this is an error, join the support server and explain situation (invite is always available via `support` command).',
    },
    util: {
      'MEMBER_NULL': 'There was no member passed.',
    },
  },
  permissions: {
    'ADD_REACTIONS': 'Add reactions',
    'ADMINISTRATOR': 'Administrator',
    'ATTACH_FILES': 'Attach files',
    'BAN_MEMBERS': 'Ban members',
    'CHANGE_NICKNAME': 'Change nickname',
    'CONNECT': 'Connect',
    'CREATE_INSTANT_INVITE': 'Create invite',
    'DEAFEN_MEMBERS': 'Deafen members in voice',
    'EMBED_LINKS': 'Embed links',
    'KICK_MEMBERS': 'Kick members',
    'MANAGE_CHANNELS': 'Manage channels',
    'MANAGE_EMOJIS': 'Manage emojis',
    'MANAGE_GUILD': 'Manage server',
    'MANAGE_MESSAGES': 'Manage messages',
    'MANAGE_NICKNAMES': 'Manage nicknames',
    'MANAGE_ROLES': 'Manage roles',
    'MANAGE_WEBHOOKS': 'Manage webhooks',
    'MENTION_EVERYONE': 'Mention everyone and all roles',
    'MOVE_MEMBERS': 'Move members in voice',
    'MUTE_MEMBERS': 'Mute members in voice',
    'PRIORITY_SPEAKER': 'Priority speaker',
    'READ_MESSAGE_HISTORY': 'Read message history',
    'SEND_MESSAGES': 'Send messages',
    'SEND_TTS_MESSAGES': 'Send TTS messages',
    'SPEAK': 'Speak in voice',
    'STREAM': 'Stream in voice',
    'USE_EXTERNAL_EMOJIS': 'Use external emojis',
    'USE_VAD': 'Use voice activation',
    'VIEW_AUDIT_LOG': 'View audit log',
    'VIEW_CHANNEL': 'View channel',
    'VIEW_GUILD_INSIGHTS': 'View guild insights',
  },
};

export const dialog = {
  en: en.dialog,
};

export const error = {
  en: en.errors,
};

export const permission = {
  en: en.permissions,
};