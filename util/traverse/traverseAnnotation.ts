import { Annotation } from '../../types/shexTypes';
import { Transformers } from './transformer';

export default async function traverseAnnotation(
  annotation: Annotation,
  transformers: Transformers,
): Promise<Annotation> {
  if (transformers.annotation) {
    return await transformers.annotation(annotation);
  }
  return annotation;
}
