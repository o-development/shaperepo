import React, { useState } from 'react';
import { createContext } from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import SchemaEditor from './guiEditors/SchemaEditor';
import { Switch } from 'antd';
import { Schema } from '../../types/shexTypes';

interface GuiShapeRepresentationProps {
  schema: SchemaRecord;
}

export type getLabelFunction = (url: string) => string | undefined;

export const GetLabelContext = createContext<getLabelFunction>(() => '');

const dummyData: Schema = {
  type: 'Schema',
  base: 'https://shaperepo.com/schemas/chat',
  '@context': 'http://www.w3.org/ns/shex.jsonld',
  prefixes: {
    srs: 'https://shaperepo.com/schemas/chat#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    mee: 'http://www.w3.org/ns/pim/meeting#',
    purl: 'http://purl.org/dc/elements/1.1/',
    flow: 'http://www.w3.org/2005/01/wf/flow#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    ns: 'http://rdfs.org/sioc/ns#',
    terms: 'http://purl.org/dc/terms/',
    foaf: 'http://xmlns.com/foaf/0.1/',
    ic: 'http://www.w3.org/2002/12/cal/ical#',
  },
  shapes: {
    'https://shaperepo.com/schemas/chat#ChatShape': {
      type: 'ShapeOr',
      shapeExprs: [
        {
          type: 'ShapeNot',
          shapeExpr: {
            type: 'Shape',
            closed: true,
            semActs: [
              {
                type: 'SemAct',
                name: 'Cool Code',
                code: 'if => then',
              },
            ],
            expression: {
              type: 'EachOf',
              expressions: [
                {
                  type: 'TripleConstraint',
                  predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                  valueExpr: {
                    type: 'NodeConstraint',
                    values: ['http://www.w3.org/ns/pim/meeting#Chat'],
                  },
                },
                {
                  type: 'TripleConstraint',
                  predicate: 'http://purl.org/dc/elements/1.1/author',
                  valueExpr: {
                    type: 'NodeConstraint',
                    nodeKind: 'iri',
                  },
                },
                {
                  type: 'TripleConstraint',
                  predicate: 'http://purl.org/dc/elements/1.1/title',
                  valueExpr: {
                    type: 'NodeConstraint',
                    datatype: 'http://www.w3.org/2001/XMLSchema#string',
                  },
                },
                {
                  type: 'TripleConstraint',
                  predicate: 'http://www.w3.org/2005/01/wf/flow#message',
                  valueExpr: {
                    type: 'ShapeRef',
                    reference:
                      'https://shaperepo.com/schemas/chat#ChatMessageShape',
                  },
                  min: 0,
                  max: -1,
                },
                {
                  type: 'TripleConstraint',
                  predicate: 'http://www.w3.org/2005/01/wf/flow#participation',
                  valueExpr: {
                    type: 'ShapeRef',
                    reference:
                      'https://shaperepo.com/schemas/chat#ChatParticipationShape',
                  },
                  min: 0,
                  max: -1,
                },
              ],
            },
          },
        },
        {
          type: 'ShapeAnd',
          shapeExprs: [
            {
              type: 'NodeConstraint',
              nodeKind: 'iri',
            },
            {
              type: 'ShapeRef',
              reference: 'https://coolShape.com/nice',
            },
          ],
        },
      ],
    },
  },
};

const GuiShapeRepresentation: React.FunctionComponent<GuiShapeRepresentationProps> = ({
  schema,
}) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div style={{ padding: '25px 50px 25px 50px' }}>
      <GetLabelContext.Provider
        value={(url: string) => {
          const { metadata } = schema;
          const foundReference = metadata.incomingReferences
            .concat(metadata.outgoingObjectReferences)
            .concat(metadata.outgoingPredicateReferences)
            .find((ref) => {
              if (typeof ref === 'string') {
                return false;
              }
              return ref._id === url;
            });
          if (foundReference && typeof foundReference !== 'string') {
            return foundReference.label;
          }
        }}
      >
        <Switch onChange={(val) => setEditMode(val)} checked={editMode} />
        <SchemaEditor
          data={dummyData}
          schemaUrl={schema.metadata.id}
          editMode={editMode}
        />
      </GetLabelContext.Provider>
    </div>
  );
};

export default GuiShapeRepresentation;
