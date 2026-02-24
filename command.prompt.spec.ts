import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

test('run Windows command from test', async () => {

  const command = 'dir';

  const { stdout, stderr } = await execAsync(command, {
    shell: 'cmd.exe'  
  });

  console.log('OUTPUT:');
  console.log(stdout);

  if (stderr) {
    console.error('ERROR:');
    console.error(stderr);
  }

  expect(stdout).toContain('Volume'); 
});