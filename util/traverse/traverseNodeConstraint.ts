import { NodeConstraint, valueSetValue } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseValueSetValue from './traverseValueSetValue';

export default async function traverseNodeConstraint(
  nodeConstraint: NodeConstraint,
  transformers: Transformers,
): Promise<NodeConstraint> {
  return await traverseObject<NodeConstraint>(
    nodeConstraint,
    {
      values: async (d) =>
        await traverseValueSetValue(d as valueSetValue, transformers),
    },
    transformers.nodeConstraint,
  );
}
