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
			const selectedText = activeTextEditor.document.getText(
				activeTextEditor.selection
			);

			vscode.env.openExternal(vscode.Uri.parse(`${URL}${selectedText}`));
		}
	});

	let terminalDisposable = vscode.commands.registerCommand('google-search.makeSearchFromTerminal',async () => {
			const selectedText = await vscode.env.clipboard.readText();
			vscode.env.openExternal(vscode.Uri.parse(`${URL}${selectedText}`));
	});

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
