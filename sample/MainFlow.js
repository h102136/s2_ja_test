'use strict';

import inquirer from 'inquirer';
import { LatLngModule } from './LatLngModule.js';

// import all modules 
const modules = {
  "LatLngConversion": LatLngModule,
  
};

async function main() {
  // choose a module
  const moduleChoice = await inquirer.prompt({
    type: 'list',
    name: 'module',
    message: 'Choose a function:',
    choices: Object.keys(modules)
  });

  const selectedModule = moduleChoice.module;

  // choose a function
  const functionChoice = await inquirer.prompt({
    type: 'list',
    name: 'function',
    message: 'Choose a funciton:',
    choices: Object.keys(modules[selectedModule].functions)
  });

  const selectedFunction = functionChoice.function;
  const funcInfo = modules[selectedModule].functions[selectedFunction];

  // get the parameters
  const answers = await inquirer.prompt(funcInfo.params);

  // call the function
  const result = await modules[selectedModule].handleFunctionSelection(selectedFunction, answers);
  console.log(`Result: `, result);
}

export { main };
