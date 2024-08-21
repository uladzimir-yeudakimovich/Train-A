import { bootstrapApplication } from '@angular/platform-browser';
import { startServer } from '@planess/train-a-backend';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

startServer()
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
