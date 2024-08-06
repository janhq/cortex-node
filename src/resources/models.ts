// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import * as ModelsAPI from './models';
import { Page } from '../pagination';

export class Models extends APIResource {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(model: string, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.get(`/models/${model}`, options);
  }

  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(options?: Core.RequestOptions): Core.PagePromise<ModelsPage, Model> {
    return this._client.getAPIList('/models', ModelsPage, options);
  }

  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization to
   * delete a model.
   */
  del(model: string, options?: Core.RequestOptions): Core.APIPromise<ModelDeleted> {
    return this._client.delete(`/models/${model}`, options);
  }

  /**
   * Start a model instance, providing basic information about the model
   */
  start(model: string, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.post(`/models/${model}/start`, options);
  }

  /**
   * Stop a model instance, providing basic information about the model
   */
  stop(model: string, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.post(`/models/${model}/stop`, options);
  }

  /**
   * Download a model.
   */
  download(model: string) {
    return this._client.post(`/models/${model}/pull`);
  }

  /**
   * Abort a model download.
   */
  abortDownload(downloadId: string) {
    return this._client.delete(`/models/${downloadId}/pull`);
  }

  /**
   * Update a model
   */
  update(model: string, body: Record<string, unknown>, options?: Core.RequestOptions) {
    return this._client.patch(`/models/${model}`, { body, ...options });
  }
}

/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
export class ModelsPage extends Page<Model> {}

/**
 * Describes an OpenAI model offering that can be used with the API.
 */
export interface Model {
  /**
   * The model identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) when the model was created.
   */
  created: number;

  /**
   * The object type, which is always "model".
   */
  object: 'model';

  /**
   * The organization that owns the model.
   */
  owned_by: string;

  /**
   * The model's engine
   */
  engine?: string;

  /**
   * The model version
   */
  version?: string;

  /**
   * The model's engine version required to run the model
   */
  engine_version?: string;
}

export interface ModelDeleted {
  id: string;

  deleted: boolean;

  object: string;
}

export namespace Models {
  export import Model = ModelsAPI.Model;
  export import ModelDeleted = ModelsAPI.ModelDeleted;
  export import ModelsPage = ModelsAPI.ModelsPage;
}
