import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ApiTestsComponent } from './api-tests/api-tests.component';
import { UserModule } from './user/user.module';
import { HomepageModule } from './homepage/homepage.module';

@NgModule({
  declarations: [
    AppComponent,
    ApiTestsComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    SecurityModule,
    UserModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
