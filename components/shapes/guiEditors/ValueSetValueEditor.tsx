import React from 'react';
import EditorComponent from './EditorComponent';
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
import ObjectLiteralEditor from './ObjectLiteralEditor';
import IriStemEditor from './IriStemEditor';
import IriStemRangeEditor from './IriStemRangeEditor';
import LiteralStemEditor from './LiteralStemEditor';
import LiteralStemRangeEditor from './LiteralStemRangeEditor';
import LanguageStemRangeEditor from './LanguageStemRangeEditor';
import LanguageEditor from './LanguageEditor';
import LanguageStemEditor from './LanguageStemEditor';
import { Tag } from 'antd';
import { useContext } from 'react';
import { GetLabelContext } from '../GuiShapeRepresentation';
import CustomLink from '../../common/CustomLink';

const ValueSetValueEditor: EditorComponent<valueSetValue> = ({ data }) => {
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
      return <ObjectLiteralEditor data={data} />;
    case 'IriStem':
      return <IriStemEditor data={data as IriStem} />;
    case 'IriStemRange':
      return <IriStemRangeEditor data={data as IriStemRange} />;
    case 'LiteralStem':
      return <LiteralStemEditor data={data as LiteralStem} />;
    case 'LiteralStemRange':
      return <LiteralStemRangeEditor data={data as LiteralStemRange} />;
    case 'Language':
      return <LanguageEditor data={data as Language} />;
    case 'LanguageStem':
      return <LanguageStemEditor data={data as LanguageStem} />;
    case 'LanguageStemRange':
      return <LanguageStemRangeEditor data={data as LanguageStemRange} />;
    default:
      return <span>Unrecognized Value Set</span>;
  }
};

export default ValueSetValueEditor;
