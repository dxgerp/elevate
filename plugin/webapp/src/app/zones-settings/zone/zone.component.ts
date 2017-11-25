import { Component, Input, OnInit } from '@angular/core';
import { IZone } from "../../../../../common/scripts/interfaces/IActivityData";
import { IZoneDefinition } from "../zone-definitions";
import { IZoneChangeOrder, IZoneChangeWhisper, ZonesService } from "../../services/zones.service";
import { MatSnackBar } from "@angular/material";
import * as _ from "lodash";

export interface IZoneChangeType {
	from: boolean;
	to: boolean;
}

@Component({
	selector: 'app-zone',
	templateUrl: './zone.component.html',
	styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

	@Input("zone")
	private _zone: IZone;

	@Input("zoneId")
	private _zoneId: number;

	@Input("zoneFrom")
	private _zoneFrom: number;

	@Input("zoneTo")
	private _zoneTo: number;

	@Input("prevZoneFrom")
	private _prevZoneFrom: number;

	@Input("nextZoneTo")
	private _nextZoneTo: number;

	@Input("isFirstZone")
	private _isFirstZone: boolean;

	@Input("isLastZone")
	private _isLastZone: boolean;

	@Input("currentZones")
	private _currentZones: IZone[];

	@Input("zoneDefinition")
	private _zoneDefinition: IZoneDefinition;

	constructor(private zonesService: ZonesService,
				private snackBar: MatSnackBar /*TODO pop Snack from parent?!*/) {
	}

	public ngOnInit(): void {

		this.zonesService.zoneChangeOrderUpdates.subscribe((change: IZoneChangeOrder) => {

			const isChangeOrderForMe = (!_.isNull(change) && (this._zoneId == change.destinationId));

			if (isChangeOrderForMe) {
				this.applyChangeOrder(change);
			}

		}, error => {

			console.error(error);

		}, () => {

			console.log("InstructionListener complete");

		});

		this.zonesService.stepUpdates.subscribe((step: number) => {
			this.zoneDefinition.step = step;
		});
	}

	public onZoneChange(changeType: IZoneChangeType): void {
		this.whisperZoneChange(changeType);
	}

	/**
	 * Whisper a IZoneChangeWhisper to <ZoneService>
	 * @param {IZoneChangeType} changeType
	 */
	public whisperZoneChange(changeType: IZoneChangeType): void {

		if (changeType.from && changeType.to) return; // Skip notify zone service on first component display

		if (changeType.from || changeType.to) {

			const zoneChangeWhisper: IZoneChangeWhisper = {
				sourceId: this.zoneId,
				from: false,
				to: false,
				value: null
			};

			if (changeType.from) {
				zoneChangeWhisper.from = true;
				zoneChangeWhisper.value = this.zone.from;
			} else if (changeType.to) {
				zoneChangeWhisper.to = true;
				zoneChangeWhisper.value = this.zone.to;
			}

			this.zonesService.whisperZoneChange(zoneChangeWhisper);
		}
	}

	private applyChangeOrder(instruction: IZoneChangeOrder): void {

		if (instruction.from) {
			this.zone.from = instruction.value
		}
		if (instruction.to) {
			this.zone.to = instruction.value
		}
	}

	public onRemoveZoneAtIndex(zoneId: number): void {

		this.zonesService.removeZoneAtIndex(zoneId)
			.then(
				message => this.popSnack(message),
				error => this.popSnack(error)
			);
	}

	/**
	 * Avoid
	 * @param {KeyboardEvent} event
	 */
	public onKeyDown(event: KeyboardEvent): void {

		const whiteListCode = [
			38, // Up arrow
			40, // Down arrow
			9, // Tab
			16 // Shift
		];

		const isKeyWhiteListed = _.indexOf(whiteListCode, event.keyCode) == -1;

		if (isKeyWhiteListed) {
			event.preventDefault();
		}
	}

	private popSnack(message: string): void {
		// TODO pop Snack from parent?! instead inject snackBar for each zones. low Perf ?!
		this.snackBar.open(message, 'Close', {duration: 2500});
	}

	get zone(): IZone {
		return this._zone;
	}

	set zone(value: IZone) {
		this._zone = value;
	}

	get zoneId(): number {
		return this._zoneId;
	}

	set zoneId(value: number) {
		this._zoneId = value;
	}

	get zoneFrom(): number {
		return this._zoneFrom;
	}

	set zoneFrom(value: number) {
		this._zoneFrom = value;
	}

	get zoneTo(): number {
		return this._zoneTo;
	}

	set zoneTo(value: number) {
		this._zoneTo = value;
	}

	get prevZoneFrom(): number {
		return this._prevZoneFrom;
	}

	set prevZoneFrom(value: number) {
		this._prevZoneFrom = value;
	}

	get nextZoneTo(): number {
		return this._nextZoneTo;
	}

	set nextZoneTo(value: number) {
		this._nextZoneTo = value;
	}

	get isFirstZone(): boolean {
		return this._isFirstZone;
	}

	set isFirstZone(value: boolean) {
		this._isFirstZone = value;
	}

	get isLastZone(): boolean {
		return this._isLastZone;
	}

	set isLastZone(value: boolean) {
		this._isLastZone = value;
	}

	get currentZones(): IZone[] {
		return this._currentZones;
	}

	set currentZones(value: IZone[]) {
		this._currentZones = value;
	}

	get zoneDefinition(): IZoneDefinition {
		return this._zoneDefinition;
	}

	set zoneDefinition(value: IZoneDefinition) {
		this._zoneDefinition = value;
	}
}
