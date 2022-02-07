# Optimization of svg files for the WorkSpacePortal

# Important

All elements workplace must be in one groupe and to have name with word 'place\_....'
Monitor must to have name 'comp'.
Room schema must not have free space around.

# How to use

Put your svg files in SourceFolder than start command 'yarn optimize' after you will get ResultFolder with svg files next step you can to get JSON file with svg files as a object with description and svg as string.
Open file app.js and write name office than start 'yarn getjson' and you will get Result_JSON folder with all svg files descriptios : officeName, roomName, schema(svg as string).

### New Instruction

#Yarn set - this command create nessary folders for work with app
#Put you svg in src/Source_SVG folder
#yarn optimize - this command to make optimize svg wich will be in src/Result_SVG
#yarn getjson - this command create JSON with you svg as string and description officeNaem, cityName.
