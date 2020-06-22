# Changelog

## 1.3.2

- Restructurized error constants slightly by splitting them into categories.

## 1.3.1

- Fixed command handler to handle situations where disabled command properly wouldn't run in DMs, but would run in guilds

## 1.3.0

- Added owner only eval command

## 1.2.0

- Integrated Redis database for prefixes
  - Handling multiple guild and custom user prefixes

## 1.1.1

- Added handling guild permissions for commands

## 1.1.0

- Upgraded message event to handle all possible command options
- Added user blacklisting

## 1.0.0

##### Initial base release

- Includes most basic command and event handlers
- Added events
  - Ready
  - Message
- Added commands
  - Ping