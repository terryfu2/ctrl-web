import * as vscode from 'vscode';
//const vscode = require('vscode');
const { exec } = require('child_process');


const URL = 'https://www.google.com/search?q=';

function activate({ subscriptions }: vscode.ExtensionContext) {

	vscode.workspace.getConfiguration().update(
		'terminal.integrated.copyOnSelection',
		true,
		vscode.ConfigurationTarget.Global
	);

	let disposable = vscode.commands.registerCommand('google-search.makeSearch',() => {
		const activeTextEditor = vscode.window.activeTextEditor;

		if (activeTextEditor) {
			let selectedText = activeTextEditor.document.getText(
				activeTextEditor.selection
			);
			selectedText = selectedText.replace(/\s+/g, " ").trim();
			vscode.env.openExternal(vscode.Uri.parse(`${URL}${selectedText}`));
		}
	});

	let terminalDisposable = vscode.commands.registerCommand('google-search.makeSearchFromTerminal',async () => {
			let selectedText = await vscode.env.clipboard.readText();
			selectedText = selectedText.replace(/\s+/g, " ").trim();
			vscode.env.openExternal(vscode.Uri.parse(`${URL}${selectedText}`));
	});

	let SelectDisposable = vscode.commands.registerTextEditorCommand("dumpvn.googleSearch", () => {
		let selectedText = getSelectedText();
		if (selectedText) {
			// JavaScript remove prefix from string
			//              # spaces and start with a line comment 
			selectedText = selectedText.replace(/^(\s*#*)(\s*)/,'');
			selectedText = selectedText.replace(/^(\s*\/*)(\s*)/,'');
			selectedText = selectedText.replace(/^\s*(<#)\s*/,'');
			selectedText = selectedText.replace(/^\s*(\/*\**)\s*/,'');
			
			vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.google.com/search?q=${encodeURI(selectedText)}`))
		}
	});

	vscode.commands.registerCommand(
		'searchGoogle.searchGoogle',
		handleRequestToSearch
	)

	subscriptions.push(disposable);
	subscriptions.push(terminalDisposable);

}

/* function updateStatusBarItem(): void {
  myStatusBarItem.text = `ctrl-web`;
	myStatusBarItem.show();
}
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate
  //updateStatusBarItem
};

function getSelectedText() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		return editor.document.getText(editor.selection);
	}
	return '';
}

async function handleRequestToSearch() {
	const searchQuery = await vscode.window.showInputBox({
	  value: '',
	  title: 'Google Search',
	  placeHolder: 'What do you want to know?',
	  validateInput: (value) => {
		if (value === '') return 'Missing query'
	  }
	})
  
	if (!searchQuery) return
  
	vscode.env.openExternal(
	  vscode.Uri.parse(`https://www.google.com/search?q=${searchQuery}`)
	)
}