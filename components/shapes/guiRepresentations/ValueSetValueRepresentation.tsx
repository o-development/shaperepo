import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import {
  valueSetValue,
  IriStem,
  IriStemRange,
  LiteralStem,
  LiteralStemRange,
  Language,
  LanguageStem,
  LanguageStemRange,
} from '../../../types/shexTypes';
import ObjectLiteralRepresentation from './ObjectLiteralRepresentation';
import IriStemRepresentation from './IriStemRepresentation';
import IriStemRangeRepresentation from './IriStemRangeRepresentation';
import LiteralStemRepresentation from './LiteralStemRepresentation';
import LiteralStemRangeRepresentation from './LiteralStemRangeRepresentation';
import LanguageStemRangeRepresentation from './LanguageStemRangeRepresentation';
import LanguageRepresentation from './LanguageRepresentation';
import LanguageStemRepresentation from './LanguageStemRepresentation';
import { Tag } from 'antd';
import { useContext } from 'react';
import { GetLabelContext } from '../GuiShapeRepresentation';
import CustomLink from '../../common/CustomLink';

const ValueSetValueRepresentation: RepresenationComponent<valueSetValue> = ({
  data,
}) => {
  const getLabel = useContext(GetLabelContext);
  if (typeof data === 'string') {
    const label = getLabel(data);
    if (label) {
      return (
        <Tag>
          <CustomLink href={`/terms?id=${encodeURIComponent(data)}`}>
            {label}
          </CustomLink>
        </Tag>
      );
    }
    return (
      <Tag>
        <CustomLink href={`/terms?id=${encodeURIComponent(data)}`}>
          {data}
        </CustomLink>
      </Tag>
    );
  }
  switch (data.type) {
    case 'ObjectLiteral':
      return <ObjectLiteralRepresentation data={data} />;
    case 'IriStem':
      return <IriStemRepresentation data={data as IriStem} />;
    case 'IriStemRange':
      return <IriStemRangeRepresentation data={data as IriStemRange} />;
    case 'LiteralStem':
      return <LiteralStemRepresentation data={data as LiteralStem} />;
    case 'LiteralStemRange':
      return <LiteralStemRangeRepresentation data={data as LiteralStemRange} />;
    case 'Language':
      return <LanguageRepresentation data={data as Language} />;
    case 'LanguageStem':
      return <LanguageStemRepresentation data={data as LanguageStem} />;
    case 'LanguageStemRange':
      return (
        <LanguageStemRangeRepresentation data={data as LanguageStemRange} />
      );
    default:
      return <span>Unrecognized Value Set</span>;
  }
};

export default ValueSetValueRepresentation;
