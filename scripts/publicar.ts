import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import ghpages from 'gh-pages';
import { RAIZ } from './contenido_comun.ts';

const ejecutar = (comando: string) => execSync(comando, { cwd: RAIZ, stdio: 'inherit' });

ejecutar('npm run contenido');
ejecutar('npm run build');

const dist = path.join(RAIZ, 'dist');
if (!existsSync(path.join(dist, 'CNAME'))) {
  console.error('dist/ no contiene CNAME (viene de public/CNAME). Se cancela para no romper el dominio.');
  process.exit(1);
}

const consola = createInterface({ input: process.stdin, output: process.stdout });
const respuesta = await consola.question('\nSe publicará dist/ en la rama gh-pages. ¿Continuar? (s/N) ');
consola.close();
if (respuesta.trim().toLowerCase() !== 's') {
  console.log('Cancelado. No se publicó nada.');
  process.exit(0);
}

await ghpages.publish(dist, { branch: 'gh-pages', dotfiles: true, message: 'deploy: actualizar sitio' });
console.log('\nPublicado. En unos minutos: https://canelaelaborados.com.ar');
