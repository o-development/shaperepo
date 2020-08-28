type EditorComponent<T> = React.FunctionComponent<{
  data: T;
  editMode?: boolean;
}>;
export default EditorComponent;
