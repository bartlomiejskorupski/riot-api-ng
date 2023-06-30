import { NgModule } from "@angular/core";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

@NgModule({
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG
    })
  ],
  exports: [LoggerModule]
})
export class AppLoggerModule {}
