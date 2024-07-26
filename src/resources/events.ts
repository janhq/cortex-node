// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import * as EventsAPI from './events';
import { Stream } from '../streaming';

export class Events extends APIResource {
  /**
   * Get download events.
   */
  downloadEvent(): Core.APIPromise<Stream<DownloadStateEvent>> {
    return this._client.get(`system/events/download`, {
      stream: true,
    }) as Core.APIPromise<Stream<DownloadStateEvent>>;
  }
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
}
