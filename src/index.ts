import {
  IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookActions, NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

import {
		nbformat
} from '@jupyterlab/coreutils';

import '../style/index.css';

// A notebook widget extension that adds a button to the toolbar
export
class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  // Create a new extension object.
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let callback = () => {
      NotebookActions.runAll(panel.content, context.session);
	  console.log('within callback');
//	  let selectBox = panel.toolbar.node.childNodes[9];
	  let selectBox = panel.toolbar.node.childNodes[9].childNodes[0].childNodes[0];

	  let cellTypes = ['Task', 'Rules']
	  for (let c of cellTypes) {
		let option = document.createElement('option');
		option.value = c.toLowerCase();
		option.textContent = c;
		selectBox.appendChild(option);
      }
	  console.log('got element for select box: ');
	  console.log(selectBox);
    };
    let button = new ToolbarButton({
      className: 'myButton',
      iconClassName: 'fa fa-fast-forward',
      onClick: callback,
      tooltip: 'Run All'
    });

    panel.toolbar.insertItem(0, 'runAll', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
	
	console.log('about to try and select:');
//	let selectBox = panel.toolbar;
//	console.log('got element for select box:');
//	console.log(selectBox);
  }
}

// Activate the extension
function activate(app: JupyterLab) {
	console.log('JupyterLab extension jupyterlab_cell_tagging is activated with an extra button!');
	console.log('testing that lab has updated');	
	app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
	
	
//	console.log(CellType);	
};

// Almost certainly incorrect
export namespace nbformat {
	export type CellType = 'code' | 'markdown' | 'raw' | 'task' | 'rule';
}

// Initialization data for the jupyterlab_cell_tagging extension.
const plugin: JupyterLabPlugin<void> = {
  activate,
  id: 'jupyterlab_cell_tagging',
  autoStart: true
};

export default plugin;
