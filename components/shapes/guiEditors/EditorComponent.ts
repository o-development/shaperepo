type EditorComponent<T, O = unknown> = React.FunctionComponent<
  O & {
    data: T;
    editMode?: boolean;
  }
>;
export default EditorComponent;
