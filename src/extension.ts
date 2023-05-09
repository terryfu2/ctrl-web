/* import * as vscode from 'vscode';
import * as querystring from 'querystring';

export function activate(context: vscode.ExtensionContext) {
    
    let disposable = vscode.commands.registerCommand('extension.searchSelectedText', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        let selectedText = editor.document.getText(editor.selection);
        if (!selectedText) {
            return; // No selected text
        }
        let encodedText = querystring.escape(selectedText);
        vscode.env.openExternal(vscode.Uri.parse(`https://www.google.com/search?q=${encodedText}`));
        vscode.window.showInformationMessage(`Searching for "${selectedText}"`);
    });

    context.subscriptions.push(disposable);
}  */
 
const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context: { subscriptions: any[]; }) {
  let disposable = vscode.commands.registerCommand('extension.searchSelectedText', function () {
    let selectedText;
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      selectedText = activeEditor.document.getText(activeEditor.selection);
      vscode.window.showInformationMessage('Info Notification2');
    } else {
      const activeTerminal = vscode.window.activeTerminal;
      if (activeTerminal) {
        //selectedText = activeTerminal.selection;
        vscode.window.showInformationMessage('Info Notification');
      }
    }
    if (selectedText) {
      vscode.env.clipboard.writeText(selectedText);
      const encodedText = encodeURIComponent(selectedText);
      const url = `https://www.google.com/search?q=${encodedText}`;
    
      vscode.window.showInformationMessage(url);

      if (process.platform === "win32") {
        exec(`start "" "${url}"`);
      } else if (process.platform === "darwin") {
        exec(`open "${url}"`);
      } else {
        exec(`xdg-open "${url}"`);
      }
    }
  });

  context.subscriptions.push(disposable);

  const terminal = vscode.window.activeTerminal;
  if (terminal) {
    context.subscriptions.push(terminal.onDidChangeSelection((e: { text: any; }) => {
      const selectedText = e.text;
      if (selectedText) {
        vscode.env.clipboard.writeText(selectedText);
        const encodedText = encodeURIComponent(selectedText);
        const url = `https://www.google.com/search?q=${encodedText}`;
        vscode.window.showInformationMessage('Info Notification');
      }
    }));
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};