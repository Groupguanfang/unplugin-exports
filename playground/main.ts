import './nest-folder/test'

document.getElementById('app')!.innerHTML = '__UNPLUGIN__'

exporter.globAll(['./*.ts', '!vite.config.ts'])
