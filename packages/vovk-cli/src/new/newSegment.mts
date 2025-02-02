import path from 'node:path';
import fs from 'node:fs/promises';
import getProjectInfo from '../getProjectInfo/index.mjs';
import getFileSystemEntryType from '../utils/getFileSystemEntryType.mjs';
import chalkHighlightThing from '../utils/chalkHighlightThing.mjs';
import formatLoggedSegmentName from '../utils/formatLoggedSegmentName.mjs';
import prettify from '../utils/prettify.mjs';

export default async function newSegment({
  segmentName,
  overwrite,
  dryRun,
}: {
  segmentName: string;
  overwrite?: boolean;
  dryRun?: boolean;
}) {
  const { apiDir, cwd, log } = await getProjectInfo();

  const absoluteSegmentRoutePath = path.join(cwd, apiDir, segmentName, '[[...vovk]]/route.ts');

  if (!overwrite && (await getFileSystemEntryType(absoluteSegmentRoutePath))) {
    throw new Error(
      `Unable to create new segment. ${formatLoggedSegmentName(segmentName, { upperFirst: true })} already exists.`
    );
  }

  const code = await prettify(
    `import { initVovk } from 'vovk';

export const runtime = 'edge';

const controllers = {};

export type Controllers = typeof controllers;

export const { GET, POST, PATCH, PUT, HEAD, OPTIONS, DELETE } = initVovk({
${segmentName ? `  segmentName: '${segmentName}',\n` : ''}  emitSchema: true,
  controllers,
});
`,
    absoluteSegmentRoutePath
  );

  if (!dryRun) {
    await fs.mkdir(path.dirname(absoluteSegmentRoutePath), { recursive: true });
    await fs.writeFile(absoluteSegmentRoutePath, code);
  }

  log.info(
    `${formatLoggedSegmentName(segmentName, { upperFirst: true })} created at ${absoluteSegmentRoutePath}. Run ${chalkHighlightThing(`npx vovk n s c ${[segmentName, 'thing'].filter(Boolean).join('/')}`)} to create a new controller with service.`
  );
}
