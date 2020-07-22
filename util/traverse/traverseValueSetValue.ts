import {
  valueSetValue,
  IriStem,
  IriStemRange,
  LiteralStem,
  LiteralStemRange,
  Language,
  LanguageStem,
  LanguageStemRange,
} from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObjectLiteral from './traverseObjectLiteral';
import traverseIriStem from './traverseIriStem';
import traverseIriStemRange from './traverseIriStemRange';
import traverseLiteralStem from './traverseLiteralStem';
import traverseLiteralStemRange from './traverseLiteralStemRange';
import traverseLanguageStem from './traverseLanguageStem';
import traverseLanguage from './traverseLanguage';
import traverseLanguageStemRange from './traverseLanguageStemRange';

export default async function traverseValueSetValue(
  valSet: valueSetValue,
  transformers: Transformers,
): Promise<valueSetValue> {
  let value;
  if (typeof valSet === 'string') {
    value = valSet;
  } else {
    switch (valSet.type) {
      case 'ObjectLiteral':
        value = await traverseObjectLiteral(valSet, transformers);
        break;
      case 'IriStem':
        value = await traverseIriStem(valSet as IriStem, transformers);
        break;
      case 'IriStemRange':
        value = await traverseIriStemRange(
          valSet as IriStemRange,
          transformers,
        );
        break;
      case 'LiteralStem':
        value = await traverseLiteralStem(valSet as LiteralStem, transformers);
        break;
      case 'LiteralStemRange':
        value = await traverseLiteralStemRange(
          valSet as LiteralStemRange,
          transformers,
        );
        break;
      case 'Language':
        value = await traverseLanguage(valSet as Language, transformers);
        break;
      case 'LanguageStem':
        value = await traverseLanguageStem(
          valSet as LanguageStem,
          transformers,
        );
        break;
      case 'LanguageStemRange':
        value = await traverseLanguageStemRange(
          valSet as LanguageStemRange,
          transformers,
        );
        break;
      default:
        value = valSet;
    }
  }

  if (transformers.valueSetValue) {
    return await transformers.valueSetValue(value);
  }
  return value;
}
