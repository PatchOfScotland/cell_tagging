# jupyterlab_cell_tagging

A JupyterLab extension.

This is an import of the repository at https://github.com/jupyterlab/jupyterlab-celltags

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab_cell_tagging
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

