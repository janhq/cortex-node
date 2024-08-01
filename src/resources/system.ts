import * as Core from '../core';
import { APIResource } from '../resource';
export class System extends APIResource {
  /**
   * Get system status, successful if it's alive.
   */
  status(options?: Core.RequestOptions): Core.APIPromise<String> {
    return this._client.get('/system', options);
  }

  /**
   * Request system to stop
   */
  destroy(options?: Core.RequestOptions): Core.APIPromise<any> {
    return this._client.delete('/system', options);
  }
}

export namespace System {
}
