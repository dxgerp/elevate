import { NgModule } from "@angular/core";
import { GlobalSettingsComponent } from "../global-settings/global-settings.component";
import { ZonesSettingsComponent } from "../zones-settings/zones-settings.component";
import { ZoneComponent } from "../zones-settings/zone/zone.component";
import { ZonesImportExportDialogComponent } from "../zones-settings/zones-import-export-dialog/zones-import-export-dialog.component";
import { ZoneToolBarComponent } from "../zones-settings/zone-tool-bar/zone-tool-bar.component";
import { GotItDialogComponent } from "./dialogs/got-it-dialog/got-it-dialog.component";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component";
import { OptionHelperDialogComponent } from "../global-settings/option-helper-dialog/option-helper-dialog.component";
import { UserSettingsService } from "./services/user-settings/user-settings.service";
import { GlobalSettingsService } from "../global-settings/services/global-settings.service";
import { ActivityService } from "./services/activity/activity.service";
import { UserSettingsDao } from "./dao/user-settings/user-settings.dao";
import { OptionHelperReaderService } from "../global-settings/services/option-helper-reader.service";
import { ZonesService } from "../zones-settings/shared/zones.service";
import { DonateComponent } from "../donate/donate.component";
import { AboutDialogComponent } from "../about-dialog/about-dialog.component";
import { WindowService } from "./services/window/window.service";
import { SideNavService } from "./services/side-nav/side-nav.service";
import { ImportBackupDialogComponent, ImportExportProgressDialogComponent } from "./dialogs/import-backup-dialog/import-backup-dialog.component";
import { ShareComponent } from "../share/share.component";
import { ReportComponent } from "../report/report.component";
import { CoreModule } from "../core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { AthleteSnapshotResolverService } from "./services/athlete-snapshot-resolver/athlete-snapshot-resolver.service";
import { AthleteService } from "./services/athlete/athlete.service";
import { AthleteDao } from "./dao/athlete/athlete-dao.service";
import { ActivityDao } from "./dao/activity/activity.dao";
import { FaqComponent } from "../faq/faq.component";
import { ActivitiesComponent } from "../activities/activities.component";
import { LoggerService } from "./services/logging/logger.service";
import { ConsoleLoggerService } from "./services/logging/console-logger.service";
import { environment } from "../../environments/environment";
import { EnvTarget } from "@elevate/shared/models";
import { ExtensionModule } from "./modules/extension/extension.module";
import { DesktopModule } from "./modules/desktop/desktop.module";
import { StreamsDao } from "./dao/streams/streams.dao";
import { StreamsService } from "./services/streams/streams.service";

@NgModule({
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		(environment.target === EnvTarget.DESKTOP) ? DesktopModule : ExtensionModule
	],
	exports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule
	],
	declarations: [
		// Components
		ActivitiesComponent,
		GlobalSettingsComponent,
		ZonesSettingsComponent,
		ZoneComponent,
		DonateComponent,
		ShareComponent,
		ReportComponent,
		FaqComponent,

		// Dialogs
		ZoneToolBarComponent,
		GotItDialogComponent,
		ConfirmDialogComponent,
		OptionHelperDialogComponent,
		ZonesImportExportDialogComponent,
		AboutDialogComponent,
		ImportBackupDialogComponent,
		ImportExportProgressDialogComponent
	],
	providers: [
		UserSettingsService,
		UserSettingsDao,
		AthleteService,
		AthleteDao,
		AthleteSnapshotResolverService,
		ActivityService,
		ActivityDao,
		StreamsService,
		StreamsDao,
		GlobalSettingsService,
		OptionHelperReaderService,
		ZonesService,
		SideNavService,
		WindowService,
		{provide: LoggerService, useClass: ConsoleLoggerService}
	]
})
export class SharedModule {
}
