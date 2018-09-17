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

import '../style/index.css';

// A notebook widget extension that adds a button to the toolbar
export
class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  // Create a new extension object.
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let callback = () => {
      NotebookActions.runAll(panel.content, context.session);
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
  }
}

// Activate the extension
function activate(app: JupyterLab) {
	console.log('JupyterLab extension jupyterlab_cell_tagging is activated with an extra button!');
	app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
};

// Initialization data for the jupyterlab_cell_tagging extension.
const plugin: JupyterLabPlugin<void> = {
  activate,
  id: 'jupyterlab_cell_tagging',
  autoStart: true
};

export default plugin;
