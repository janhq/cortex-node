// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Page } from '../pagination';
import * as Core from '../core';
import { APIResource } from '../resource';
import * as EnginesAPI from './engines';
import { Stream } from '../streaming';
import { DownloadStateEvent } from './events';

export interface InitOptions {
  runMode?: 'CPU' | 'GPU';
  gpuType?: 'Nvidia' | 'Others (Vulkan)';
  instructions?: 'AVX' | 'AVX2' | 'AVX512' | undefined;
  cudaVersion?: '11' | '12';
  silent?: boolean;
  vulkan?: boolean;
}

export class Engines extends APIResource {
  /**
   * Retrieves an engine instance, providing basic information about the engine.
   */
  retrieve(engine: string, options?: Core.RequestOptions): Core.APIPromise<Engine> {
    return this._client.get(`/engines/${engine}`, options);
  }

  /**
   * Lists the currently available engines, including local and remote engines
   */
  list(options?: Core.RequestOptions): Core.PagePromise<EnginesPage, Engine> {
    return this._client.getAPIList(`/engines`, EnginesPage, options);
  }

  /**
   * Initializes an engine instance with the given name.
   * It will download the engine if it is not available locally.
   */
  init(
    engine: string,
    initOptions: InitOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Engine> {
    return this._client.post(`/engines/${engine}/init`, {
      ...initOptions,
      ...options,
    });
  }

  /**
   * Update the engine instance with the given name.
   */
  update(
    engine: string,
    body: Record<string, unknown>,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Engine> {
    return this._client.patch(`/engines/${engine}`, { body, ...options });
  }
}

/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
export class EnginesPage extends Page<Engine> {}

/**
 * An engine instance, providing basic information about the engine.
 */
export interface Engine {
  /**
   * The name of the engine.
   */
  name: string;

  /**
   * The product name of the engine.
   */
  productName: string;

  /**
   * The description of the engine.
   */
  description: string;

  /**
   * The version of the engine.
   */

  version: string;
  /**
   * The status of the engine.
   */
  status: string;
}

export namespace Engines {
  export import Engine = EnginesAPI.Engine;
  export import EnginesPage = EnginesAPI.EnginesPage;
}
