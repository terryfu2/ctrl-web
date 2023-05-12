import * as vscode from 'vscode';
//const vscode = require('vscode');
const { exec } = require('child_process');
let myStatusBarItem: vscode.StatusBarItem;

function activate({ subscriptions }: vscode.ExtensionContext) {

  const myCommandId = 'extension.searchSelectedText';
  
  let disposable = vscode.commands.registerCommand(myCommandId, async function () {
    let selectedText;
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
      selectedText = activeEditor.document.getText(activeEditor.selection);
      //vscode.window.showInformationMessage('Info Notification2');
    } else {
      const activeTerminal = vscode.window.activeTerminal;
      if (activeTerminal) {
        //selectedText = activeTerminal.selection;
        //vscode.window.showInformationMessage('Info Notification');
      }
    }
    if (selectedText) {
      vscode.env.clipboard.writeText(selectedText);
      const encodedText = encodeURIComponent(selectedText);
      const url = `https://www.google.com/search?q=${encodedText}`;
    
      if (process.platform === "win32") {
        exec(`start "" "${url}"`);
      } else if (process.platform === "darwin") {
        exec(`open "${url}"`);
      } else {
        exec(`xdg-open "${url}"`);
      }
    }
    /* let selectedText = await vscode.env.clipboard.readText();
    const encodedText = encodeURIComponent(selectedText);
    const url = `https://www.google.com/search?q=${encodedText}`;
    if (process.platform === "win32") {
      exec(`start "" "${url}"`);
    } else if (process.platform === "darwin") {
      exec(`open "${url}"`);
    } else {
      exec(`xdg-open "${url}"`);
    } */
  }); 
  
  
/*   myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000000);
	myStatusBarItem.command = myCommandId;
  subscriptions.push(myStatusBarItem);*/
  subscriptions.push(disposable);

  //updateStatusBarItem(); 
  
  /* const terminal = vscode.window.activeTerminal;
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
  } */
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
