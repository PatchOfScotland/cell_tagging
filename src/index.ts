import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_cell_tagging extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_cell_tagging',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_cell_tagging is activated!');
  }
};

export default extension;
