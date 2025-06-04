# Introduction

MediPulse is an advanced social media optimization solution designed particularly to help Palomar Health achieve its maximum YouTube visibility and audience engagement. Data-driven and AI-powered, MediPulse analyzes video performance, audience engagement, content trends, and publishing habits to offer actionable insights that enhance visibility, stimulate engagement, and maximize the hospital's digital outreach.

By converting raw YouTube analytics into action, MediPulse empowers Palomar Health's marketing team to make more efficient videos, target the right audience, and have a stronger connection with the community. With a minimalistic dashboard and simple design, the platform makes optimizing content easier even for non-technical teams.

## Project Overview

MediPulse is built using modern web technologies and follows best practices for data analysis and visualization. The project leverages GitHub Pages for hosting and documentation, making it easy for the team to maintain and update the platform.

## Key Features

- **YouTube Analytics Integration**: Seamless connection with YouTube's API for real-time data analysis
- **Performance Dashboard**: Interactive visualization of key metrics and KPIs
- **Content Optimization**: AI-powered insights for improving video content and engagement
- **Audience Analysis**: Deep dive into viewer demographics and behavior patterns
- **Publishing Optimization**: Data-driven recommendations for optimal posting times and frequency
- **Technical Infrastructure**: Built with modern web technologies and scalable architecture

## Development Requirements

The MediPulse platform requires a modern development environment with the following components:

- Python for data analysis and AI components
- YouTube Data API credentials
- GitHub account for version control and deployment

## GitHub Pages Setup

The project uses GitHub Pages for hosting and documentation. Follow these steps to set up your development environment:

**Activate GitHub Pages Actions**: 
- On the GitHub website for the repository go to the menu: Settings -> Pages ->Build
- Under the Deployment location on the page, select "GitHub Actions"

**Update `_config.yml`**: 
```text
github_repo: "medipulse" 
baseurl: "/medipulse"
```

**Set Repository Name in Makefile**: 
```make
# Configuration, override port with usage: make PORT=4200
PORT ?= 4887
REPO_NAME ?= medipulse
LOG_FILE = /tmp/jekyll$(PORT).log
```

### Tool Requirements

- **Node.js**: Required for frontend development and package management
- **Python**: Used for data analysis and AI components
- **Git**: Version control system
- **Visual Studio Code**: Recommended IDE with extensions for JavaScript, Python, and Git
- **YouTube Data API**: Required for accessing YouTube analytics data

## Development Environment Setup

To isolate dependencies and ensure a clean development environment, it's recommended to use a Python virtual environment. Follow these steps:

1. Navigate to the repository root directory:
   ```bash
   cd <repo-dir>

2. Create Environment
  python -m venv venv

3. Activate environment
  source venv/bin/activate

4. Install Packages
  pip install -r requirements.txt

#### Clone Repo

Run these commands to obtain the project, then locate into the project directory with the terminal, install an extensive set of tools, and make.

```bash
git clone <this-repo> # git clone https://github.com/nighthawkcoders/portfolio_2025.git 
cd <repo-dir>/scripts # cd portfolio_2025
```

#### Windows WSL and/or Ubuntu Users

- Execute the script: `./activate_ubuntu.sh`

#### macOS Users

- Execute the script: `./activate_macos.sh`

#### Kasm Cloud Desktop Users

- Execute the script: `./activate.sh`

## Run Server on localhost

To preview the project you will need to "make" the project.

### Bundle install

The very first time you clone run project you will need to run this Ruby command as the final part of your setup.

```bash
bundle install
```

### Start the Server  

This requires running terminal commands `make`, `make stop`, `make clean`, or `make convert` to manage the running server.  Logging of details will appear in the terminal.   A `Makefile` has been created in the project to support commands and start processes.

Start the server, this is the best choice for initial and iterative development.  Note. after the initial `make`, you should see files automatically refresh in the terminal on VSCode save.

  ```bash
  make
  ```

### Load web application into the Browser

Start the preview server in the terminal,
The terminal output from `make` shows the server address. "Cmd" or "Ctl" click the http location to open the preview server in a browser. Here is an example Server address message, click on the Server address to load:...

  ```text
  http://0.0.0.0:4887/flocker_frontend/
  ```

### Regeneration of web application

Save on ".ipynb" or ".md" file activiates "regeneration". An example terminal message is below.  Refresh the browser to see updates after the message displays.

  ```text
  Regenerating: 1 file(s) changed at 2023-07-31 06:54:32
      _notebooks/2024-01-04-cockpit-setup.ipynb
  ```

### Other "make" commands

Terminal messages are generated from background processes.  At any time, click return or enter in a terminal window to obtain a prompt.  Once you have the prompt you can use the terminal as needed for other tasks.  Always return to the root of project `cd ~/vscode/portfolio_2025` for all "make" actions.

#### Stop the preview server

Stopping the server ends the web server applications running process.  However, it leaves constructed files in the project in a ready state for the next time you run `make`.

  ```bash
  make stop
  ```

### Clean the local web application environment

This command will top the server and "clean" all previously constructed files (ie .ipynb -> .md). This is the best choice when renaming files has created duplicates that are visible when previewing work.

  ```bash
  make clean
  ```

### Observe build errors

Test Jupyter Notebook conversions (ie .ipynb -> .md), this is the best choice to see if an IPYNB conversion error is occurring.

  ```bash
  make convert
  ```

## Development Support

### File Names in "_posts", "_notebooks"

There are two primary directories for creating blogs.  The "_posts" directory is for authoring in markdown only.  The "_notebooks" allows for markdown, pythons, javascript and more.

To name a file, use the following structure (If dates are in the future, review your config.yml setting if you want them to be viewed).  Review these naming conventions.

- For markdown files in _posts:
  - year-month-day-fileName.md
    - GOOD EXAMPLE: 2021-08-02-First-Day.md
    - BAD EXAMPLE: 2021-8-2-first-day.md
    - BAD EXAMPLE: first-day.md
    - BAD EXAMPLE: 2069-12-31-First-Day.md

- For Jupyter notebooks in _notebooks:
  - year-month-day-fileName.ipynb
    - GOOD EXAMPLE: 2021-08-02-First-Day.ipynb
    - BAD EXAMPLE: 2021-8-2-first-day.ipynb
    - BAD EXAMPLE: first-day.ipynb
    - BAD EXAMPLE: 2069-12-31-First-Day.ipynb

### Tags

Tags are used to organize pages by their tag the way to add tags is to add the following to your front matter such as the example seen here `categories: [Tools]` Each item in the same category will be lumped together to be seen easily on the search page.

### Search

All pages can be searched for using the built-in search bar. This search bar will search for any word in the title of a page or in the page itself. This allows for easily finding pages and information that you are looking for. However, sometimes this may not be desirable so to hide a page from the search you need to add `search_exclude: true` to the front matter of the page. This will hide the page from appearing when the viewer uses search.

### Navigation Bar

To add pages to the top navigation bar use _config.yml to order and determine which menus you want and how to order them.  Review the_config.yml in this project for an example.

### Blog Page

There is a blog page that has options for images and a description of the page. This page can help the viewer understand what the page is about and what they can expect to find on the page. The way to add images to a page is to have the following front matter `image: /images/file.jpg` and then the name of the image that you want to use. The image must be in the `images` folder. Furthermore, if you would like the file to not show up on the blog page `hide: true` can be added to the front matter.

### SASS support

NIGHTHAWK Pages support a variety of different themes that are each overlaid on top of minima. To use each theme, go to the "_sass/minima/custom-styles.scss" file and simply comment or uncomment the theme you want to use.

To learn about the minima themes search for "GitHub Pages minima" and review the README.

To find a new theme search for "Github Pages Themes".

### Includes

- Nighthawk Pages uses liquid syntax to import many common page elements that are present throughout the repository. These common elements are imported from the _includes directory. If you want to add one of these common elements, use liquid syntax to import the desired element to your file. Here's an example of the liquid syntax used to import: `{%- include post_list.html -%}` Note that the liquid syntax is surrounded by curly braces and percent signs. This can be used anywhere in the repository.

### Layouts

- To use or create a custom page layout, make an HTML page inside the _layouts directory, and when you want to use that layout in a file, use the following front matter `layout: [your layout here]`.  All layouts will be written in liquid to define the structure of the page.

### Metadata

Metadata, also known as "front matter", is a set of key-value pairs that can provide additional information to GitHub Pages about .md and .ipynb files. This can and probably will be used in other file types (ie doc, pdf) if we add them to the system.

In the front matter, you can also define things like a title and description for the page.  Additional front matter is defined to place content on the "Computer Science Lab Notebook" page.  The `courses:` key will place data on a specific page with the nested `week:` placing data on a specific row on the page.  The `type:` key in "front matter" will place the blog under the plans, hacks(ToDo), and tangibles columns.

- In our files, the front matter is defined at the top of the page or the first markdown cell.

  - First, open one of the .md or .ipynb files already included in either your _posts|_notebooks folder.

  - In the .md file, you should notice something similar to this at the top of the page. To see this in your .ipynb files you will need to double-click the markdown cell at the top of the file.

  ```yaml
  ---
  toc: true
  comments: true
  layout: post
  title: Jupyter Python Sample
  description: Example Blog!!!  This shows code and notes from hacks.
  type: ccc
  courses: { csa: {week: 5} }
  ---
  ```

- The front matter will always have '---' at the top and bottom to distinguish it and each key-value pair will be separated by a ':'.

- Here we can modify things like the title and description.

- The type value will tell us which column this is going to appear under the time box supported pages.  The "ccc" stands for Code, Code, Code.

- The courses will tell us which menu item it will be under, in this case, the `csa` menu, and the `week` tells it what row (week) it will appear under that menu.
