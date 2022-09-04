/* eslint-disable @typescript-eslint/no-explicit-any */
import { Awaitable } from "discord.js";
import { ExtendClient } from "../Client";

export interface IBaseModule {
    init(): void
}
export class BaseModule {
	client: ExtendClient;
	callbacks: Map<string, (...args: any[]) => Awaitable<void>>;
	constructor(client: ExtendClient) {
		this.client = client;
		this.callbacks = new Map();
	}
	public removeCallback(eventName: string, func?: (...args: any[]) => Awaitable<void>) {
		if (func != undefined) {
			this.client.removeListener(eventName, func);
			return;
		}
		const oldCallback = this.callbacks.get(eventName);
		if (oldCallback == undefined) return;
		this.client.removeListener(eventName, oldCallback);
		return;
	}
	public regCallback(eventName: string, func: (...args: any[]) => Awaitable<void>, once = false) {
		const oldCallback = this.callbacks.get(eventName);
		if (oldCallback != undefined) {
			this.removeCallback(eventName, oldCallback);
		}
		this.callbacks.set(eventName, func);
		if (once) {
			this.client.once(eventName, func);
		} else {
			this.client.on(eventName, func);
		}
		return;
	}
	public destroy() {
		this.callbacks.forEach((func, eventName) => {
			this.client.removeListener(eventName, func);
		});
		this.callbacks = new Map();
	}
}