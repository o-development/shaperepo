import React from 'react';
import EditorComponent from './EditorComponent';
import { Schema } from '../../../types/shexTypes';
import ShapesEditor from './ShapesEditor';
import { Collapse } from 'antd';
import ImportsEditor from './ImportsEditor';
import StartEditor from './StartEditor';
import BaseEditor from './BaseEditor';
import PrefixesEditor from './PrefixesEditor';
import SemActsEditor from './SemActsEditor';
const { Panel } = Collapse;

interface AdditionalSchemaEditorProps {
  schemaUrl: string;
}

const SchemaEditor: EditorComponent<Schema, AdditionalSchemaEditorProps> = ({
  data,
  editMode,
  schemaUrl,
}) => {
  return (
    <>
      <ShapesEditor
        data={data.shapes}
        editMode={editMode}
        schemaUrl={schemaUrl}
      />
      <Collapse ghost>
        <Panel header="Advanced Schema Settings" key="1">
          <StartEditor data={data.start} editMode={editMode} />
          <ImportsEditor data={data.imports} editMode={editMode} />
          <BaseEditor data={data.base} editMode={editMode} />
          <PrefixesEditor data={data.prefixes} editMode={editMode} />
          <SemActsEditor data={data.startActs} editMode={editMode} />
        </Panel>
      </Collapse>
    </>
  );
};

export default SchemaEditor;
