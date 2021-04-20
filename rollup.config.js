// import de nos plugins
import commonjs from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const iife =  {
    input: 'src/index.js', // notre fichier source au format ESM
    output: {
        format: 'iife',
        file: 'public/js/jhotecslider.iife.min.js',
        name: 'jhotecslider' // les modules iife doivent être nommés afin de pouvoir y faire référence depuis d'autres modules
    },
    plugins: [
        commonjs(), // prise en charge de require
        noderesolve(), // si nécessaire, prise en charge des modules depuis node_modules
        babel({ babelHelpers: 'bundled' }), // transpilation
        terser() // minification
    ]
}

const esm =  {
    input: 'src/index.js', // notre fichier source au format ESM
    output: {
        format: 'es',
        file: 'public/js/jhotecslider.esm.min.js',
    },
    plugins: [
        commonjs(), // prise en charge de require
        noderesolve(), // prise en charge des modules depuis node_modules
        babel({ babelHelpers: 'bundled' }), // transpilation
        terser() // minification
    ]
}

const conf = process.env.BABEL_ENV === 'esm' ? esm : iife;
export default conf;
