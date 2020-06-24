# Changelog

## 1.5.2

- Updated `ban` command to always use localized strings.

## 1.5.1

- Added possibility to do replacements in the `localize` function directly.

## 1.5.0

- Added `localize` function to allow string localization.
  - For now all strings are statically in `en` lang.

## 1.4.2

- Move self ban check to allow it to catch more cases.

## 1.4.1

- Change names of exports in `constants` file

## 1.4.0

- Added `ban` command.

## 1.3.2

- Restructurized error constants slightly by splitting them into categories.

## 1.3.1

- Fixed command handler to handle situations where disabled command properly wouldn't run in DMs, but would run in guilds.

## 1.3.0

- Added owner only `eval` command.

## 1.2.0

- Integrated Redis database for prefixes.
  - Handling multiple guild and custom user prefixes.

## 1.1.1

- Added handling guild permissions for commands.

## 1.1.0

- Upgraded message event to handle all possible command options.
- Added user blacklisting.

## 1.0.0

##### Initial base release

- Includes most basic command and event handlers.
- Added events
  - Ready
  - Message
- Added commands
  - Ping