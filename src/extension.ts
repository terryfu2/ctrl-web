import * as vscode from 'vscode';
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
}
