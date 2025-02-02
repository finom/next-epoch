import { initVovk } from 'vovk';

import ClientController from 'src/client/ClientController';
import StreamingController from 'src/client/StreamingController';
import StreamingGeneratorController from 'src/client/StreamingGeneratorController';
import CostomSchemaController from 'src/client/CostomSchemaController';
import WithZodClientController from 'src/client/WithZodClientController';
import WithYupClientController from 'src/client/WithYupClientController';
import WithDtoClientController from 'src/client/WithDtoClientController';

const controllers = {
  ClientControllerRPC: ClientController,
  StreamingControllerRPC: StreamingController,
  StreamingGeneratorControllerRPC: StreamingGeneratorController,
  CostomSchemaControllerRPC: CostomSchemaController,
  WithZodClientControllerRPC: WithZodClientController,
  WithYupClientControllerRPC: WithYupClientController,
  WithDtoClientControllerRPC: WithDtoClientController,
};

export type Controllers = typeof controllers;

export const { GET, POST, PATCH, PUT, HEAD, OPTIONS, DELETE } = initVovk({
  segmentName: 'foo/client',
  controllers,
  onError: (err, req) => {
    // eslint-disable-next-line no-console
    console.log('onError', err.message, req.url);
  },
});
