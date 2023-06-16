// Taken from https://github.com/Yeboster/autocomplete-obsidian/blob/master/src/autocomplete/view.ts

import {Direction} from '../autocomplete-engine'
import {TicketDefinition} from "../types";

export function generateView(suggestions: TicketDefinition[], selectedIndex: number) {
	const suggestionsHtml = suggestions?.map((tip: TicketDefinition, index) => {
		const isSelected = selectedIndex === index
		// TODO add custom formatting for output
		return `
        <div id="suggestion-${index}" class="no-space-wrap suggestion-item${
			isSelected ? ' is-selected' : ''
		}">
          <div id="suggestion-${index}" class="suggestion-content">
          <span class="suggestion-flair">${tip.ticket_tag}</span>
          ${tip.ticket_number}: ${tip.ticket_title} --- ${tip.ticket_tag}
          </div>
        </div>
      `
	}, [])
	const suggestionsJoined = suggestionsHtml.join('\n')
	const viewString = `
      <div id="suggestion-list" class="suggestion">
        ${
		suggestionsJoined.length > 0
			? suggestionsJoined
			: '<div class="no-suggestions">No match found</div>'
	}
      </div>
      <div class="prompt-instructions">
        <div class="prompt-instruction">
          <span class="prompt-instruction-command">Ctrl+N /↑ </span>
          <span>Next Suggestion</span>
        </div>
        <div class="prompt-instruction">
          <span class="prompt-instruction-command">Ctrl+P /↓ </span>
          <span>Previous Suggestion</span>
        </div>
        <div class="prompt-instruction">
          <span class="prompt-instruction-command">Enter/Tab</span>
          <span>Select Suggestion</span>
        </div>
      </div>
    `
	const containerNode = document.createElement('div')
	containerNode.classList.add('suggestion-container')
	containerNode.insertAdjacentHTML('beforeend', viewString)

	return containerNode
}

export function updateCachedView(view: HTMLElement, selectedIndex: number) {
	const children = view.firstElementChild?.children

	if (!children) return

	for (let index = 0; index < children.length; index++) {
		const child = children[index]
		child.toggleClass('is-selected', index === selectedIndex)
	}
}

export function scrollTo(
	selected: Direction,
	view: HTMLElement,
	suggestionsLength: number
) {
	if (!view || suggestionsLength === 0) return

	// TODO: Improve scrolling with page size and boundaries

	const parent = view.children[0]
	const selectedIndex = selected.index
	const child = parent.children[0]
	if (child) {
		const scrollAmount = child.scrollHeight * selectedIndex

		switch (selected.direction) {
			case 'forward':
				if (selectedIndex === 0)
					// End -> Start
					parent.scrollTop = 0
				else parent.scrollTop = scrollAmount
				break
			case 'backward':
				if (selectedIndex === suggestionsLength - 1)
					// End <- Start
					parent.scrollTop = parent.scrollHeight
				else parent.scrollTop = scrollAmount
				break
		}
	}
}

export function appendWidget(
	editor: CodeMirror.Editor,
	view: HTMLElement,
	scrollable = true
) {
	const cursor = editor.getCursor()

	editor.addWidget({ ch: cursor.ch, line: cursor.line }, view, scrollable)
}
