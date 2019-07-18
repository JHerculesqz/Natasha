# Dev Environment standardization
## NodeJS
## NPM(CNpm)
## VueCLI
## WebStorm
## Chrome Plugin(Vue)
## Nexus
    STEP1.run nexus-3.14.0-04-win64/S-Frame.Nexus.bat
    STEP2.http://localhost:8081/ admin admin123
    STEP3.Settings/Blob Stores
    STEP4.Settings/Repositories
        npm proxy(https://registry.npm.taobao.org)
        npm host
        npm group
    STEP5.[once]npm Bearer Token Realm

# Project standardization
## Project base on JS/JQuery
    (1)Directory
        css
        image
        js
        lib(3rd component or widget)
        index.html
        package.json
    (2)WebPack
        see details in package.json
    (3)Publish
        STEP1.[once]npm config set registry http://localhost:8081/repository/NpmHost/
        STEP2.[once]npm login(admin/admin123/admin@example.org)
        STEP3.npm publish

## Project base on VUE
    (1)Directory
        build
        config
        src
          components
            walle
              component
              core
              widget
          pages
        static
        .babelrc
        .editorconfig
        .postcssrc.js
        jsdoc.json
        package.json

    (2)Create Project & WebPack
        see details in package.json



# Third Party Component standardization

# Business Component standardization
