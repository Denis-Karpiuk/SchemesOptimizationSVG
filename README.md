# Optimization SVG files for the WorkSpacePortal

## Important!

### Workplace must be:

- all elements of the workplace must be in **`the same group`**
- the group must have an id with the word "place\_" in the name : **`id="place_SOMENAME"`**
- element computer must have **`id="comp"`**
- the place number must be represented by the tag `<text>`
- room schema must not have free space around

![](./assets/Workplace.png) ![](./assets/RoomSchema.png)

# How to use

# Add new office

## Step 1

- run the command **`yarn set`** in the terminal - this command will create nessary folders in **`src`** folder for work app

## Step 2

- put you svg files in **`src/Source_SVG`**

## Step 3

- open file **`app/office_city_names.js`**
- and change **`office`** and **`city`** currents to need you

## Step 4

* run the command **`yarn fullflow`** in the terminal - this command create:

  + json file with svg schema as stirng for data base in folder **`server/WSP.WebAPI/Json/Rooms/JSON_FILE`**
  + folder with all previews for office rooms in folder **`client/assets/images/roomPreviews/FOLDER_WITH_PREVIEW`**
  + all dynamic imports for render nessary previews in moment in file **`client/utils/previewsImport/roomPreviews.js`**

# Add some rooms for existing office

## Step 1, Step 2, Step 3 as higer

## Step 4

* run the command **`yarn someflow`** - this command create:

  + json file with svg schema as stirng for data base in folder **`src/Result_JSON`**
  + svg for previews in folder **`src/Result_Previews_SVG`**

_*you need copy nessary data from these folders and add to existing offices json and folder with perviews and add dynamic imprt for these rooms._

# Additionaly

## Only optimizing SVG

- run the command **`yarn optimize`** in the terminal - this command create new optimized svg files in the folder **`Result_SVG`**

## Only create SVG prewies (create svg files wihout numbers on tables)

- run **`yarn getprev`** - this command create new svg files if folder **`src/Result_Previews_SVG`**

## Converte SVG previews for rooms to PNG format

- run **`yarn getpng`** - thisc command converte svg files from folder **`src/Result_Previews_SVG`** to png files in **`src/Result_Previews_PNG`**

## Clrear Source_SVG folder
- run **`yarn clearsource`** - this command delete files from **`src/Source_SVG`**

## Delete all folders from src
- run **`yarn clearsrc`** - this command delete all folders with files in **`src**


