# Obsidian Ticket Helper

## How to use

### Initial setup

1. Clone this repo into the .obsidian folder of your vault
2. Run `npm install` and `npm run build` (build needs to be re-run everytime you make changes to the code)

### Adding tickets to your index

1. Create a folder in your vault that you want to use for your ticket index files (this folder will be called
   ticket-root from now on)
2. Create a new note in your ticket-root containing some real or exemplary tickets e.g.

```
12345:This is a test ticket---MyTAG
56789:Another test ticket---DatTag
```

A `TicketDefinition` consists of three values: ticket number, ticket title and ticket tag. These need to be separated by
easy to identify separators. In our example we chose the following pattern:
`[ticket number]:[ticket title]---[ticket tag]`

As you can see, the ticket number and ticket title are separated by a `:`, and the ticket title and ticket tag are
separated by `---`.

It is important to choose separators which have a minimal chance of being used in either the ticket title or ticket tag.
Also note that all parts of the ticket will be trimmed.

### Configuring the plugin

Now that we created some tickets we need to tell the plugin which separators will be used to parse our input.

This can be done by going to the `settings` of your vault, and clicking on `Community plugins`. In the list on the
bottom of the page
you should find the **Obsidian Ticket Helper**. Enable the plugin.

After enabling the plugin you should see a new entry under "Community plugins" on the left side. Click on the entry for
the **Obsidian Ticket Helper**.

Here you will find the following settings:

| CONFIGURATION PARAMETER         | DEFAULT VALUE | DESCRIPTION                                                     |
|---------------------------------|---------------|-----------------------------------------------------------------|
| Completion trigger charsequence | ;;            | The characters to input to trigger autocompletion               |
| Ticket tag separator            | ---           | The characters used to separate ticket title from ticket tag    |
| Ticket number separator         | :             | The characters used to separate ticket number from ticket title |
| Index folder location           | none          | The folder containing the ticket index files                    |

Configure your separators. After the configuration was finished the settings can be closed and you can start using the plugin!
