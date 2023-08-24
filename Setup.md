# Setup

## Prerequisites

**Install Node.js tools, if you haven't already**

We're going to use the package manager [npm](https://www.npmjs.com/package/npm) to get more tools to make the process of building our project easier.

Visit [https://nodejs.org/](https://nodejs.org).

Download the version with "LTS" next to the number and install it. (LTS stands for Long Term Support, if you're curious.) In the Node.js Windows installer, accept the installation defaults. You do not need to install any additional tools for Native compilation.

**Install Visual Studio Code, if you haven't already**

Visit the [Visual Studio Code website](https://code.visualstudio.com) and install Visual Studio Code.

## Getting Started

1. Use npm to install our tools:

   ```powershell
   npm i
   ```

1. When that's done, enter:

   ```powershell
   npm i gulp-cli --global
   ```

It might also ask you to install the Minecraft Debugger and Blockception's Visual Studio Code plugin, which are plugins to Visual Studio Code that can help with Minecraft development. Go ahead and do that, if you haven't already.

# Running

To actually run the project, you must run `gulp` or `gulp watch` in the terminal.

# Gulpfile

At the top of the gulpfile there is a field for the name of the folder/project

# Manifest

In the behavior_packs folder change the name of the folder in that to match the name in the gulpfile.

In the same folder change the manifest.json to match your needs.

> `note`: this whole folder will be copied to the development_behavior_packs folder located at `%appdata%\Minecraft Education Edition\games\com.mojang\development_behavior_packs`

and if there is a resource_packs folder it will also be copied to the corresponding folder.
