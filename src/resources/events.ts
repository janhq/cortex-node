// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import * as EventsAPI from './events';
import { Stream } from '../streaming';

export class Events extends APIResource {
  /**
   * Get download events.
   * @deprecated Use `download` instead.
   */
  downloadEvent(): Core.APIPromise<Stream<DownloadStateEvent>> {
    return this._client.get(`/system/events/download`, {
      stream: true,
    }) as Core.APIPromise<Stream<DownloadStateEvent>>;
  }

  /**
   * Get download events.
   */
  download(): Core.APIPromise<Stream<DownloadStateEvent>> {
    return this._client.get(`/system/events/download`, {
      stream: true,
    }) as Core.APIPromise<Stream<DownloadStateEvent>>;
  }

  /**
   * Get model status.
   */
  model(): Core.APIPromise<Stream<EventsAPI.ModelEvent>> {
    return this._client.get(`/system/events/model`, {
      stream: true,
    }) as Core.APIPromise<Stream<EventsAPI.ModelEvent>>;
  }

  /**
   * Get resources status.
   */
  resources(): Core.APIPromise<Stream<EventsAPI.ResourceEvent>> {
    return this._client.get(`/system/events/resources`, {
      stream: true,
    }) as Core.APIPromise<Stream<EventsAPI.ResourceEvent>>;
  }
}

export interface ResourceEvent {
  data: ResourceStatus;
}

export interface ResourceStatus {
  mem: UsedMemInfo;
  cpu: {
    usage: number;
  };
}

export interface UsedMemInfo {
  total: number;
  used: number;
}

const ModelLoadingEvents = [
  'starting',
  'stopping',
  'started',
  'stopped',
  'starting-failed',
  'stopping-failed',
  'model-downloaded',
  'model-downloaded-failed',
  'model-deleted',
] as const;

export type ModelId = string;

export type ModelLoadingEvent = (typeof ModelLoadingEvents)[number];

const AllModelStates = ['starting', 'stopping', 'started'] as const;

export type ModelState = (typeof AllModelStates)[number];

export interface ModelStatus {
  model: ModelId;
  status: ModelState;
  metadata: Record<string, unknown>;
}

export interface ModelEvent {
  model: ModelId;
  event: ModelLoadingEvent;
  metadata: Record<string, unknown>;
}

export const EmptyModelEvent = {};
export interface ModelStatusAndEvent {
  data: {
    status: Record<ModelId, ModelStatus>;
    event: ModelEvent | typeof EmptyModelEvent;
  };
}

export enum DownloadStatus {
  Pending = 'pending',
  Downloading = 'downloading',
  Error = 'error',
  Downloaded = 'downloaded',
}

export enum DownloadType {
  Model = 'model',
  Miscelanous = 'miscelanous',
  Engine = 'engine',
}

export interface DownloadItem {
  /**
   * Filename of the download.
   */
  id: string;

  time: {
    elapsed: number;
    remaining: number;
  };

  size: {
    total: number;
    transferred: number;
  };

  checksum?: string;

  status: DownloadStatus;

  error?: string;

  metadata?: Record<string, unknown>;
}

export interface DownloadState {
  /**
   * The id of a particular download. Being used to prevent duplication of downloads.
   */
  id: string;

  /**
   * For displaying purposes.
   */
  title: string;

  /**
   * The type of download.
   */
  type: DownloadType;

  /**
   * The status of the download.
   */
  status: DownloadStatus;

  /**
   * Explanation of the error if the download failed.
   */
  error?: string;

  /**
   * The actual downloads. [DownloadState] is just a group to supporting for download multiple files.
   */
  children: DownloadItem[];
}

export type DownloadStateEvent = DownloadState[];

export namespace Events {
  export import DownloadStateEvent = EventsAPI.DownloadStateEvent;
  export import DownloadStatus = EventsAPI.DownloadStatus;
  export import DownloadType = EventsAPI.DownloadType;
  export import DownloadItem = EventsAPI.DownloadItem;
  export import ModelStatus = EventsAPI.ModelStatus;
  export import ModelEvent = EventsAPI.ModelEvent;
  export import ModelId = EventsAPI.ModelId;
  export import ModelLoadingEvent = EventsAPI.ModelLoadingEvent;
  export import ModelState = EventsAPI.ModelState;
  export import ModelStatusAndEvent = EventsAPI.ModelStatusAndEvent;
  export import ResourceEvent = EventsAPI.ResourceEvent;
  export import ResourceStatus = EventsAPI.ResourceStatus;
  export import UsedMemInfo = EventsAPI.UsedMemInfo;
}
